import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.local' });
dotenv.config();

const DEFAULT_MONGO_URI = 'mongodb://127.0.0.1:27017/brickbyte';
const DEFAULT_RETRY_DELAY_MS = 10000;

let listenersRegistered = false;
let reconnectTimer = null;
let connectionPromise = null;

const stateMap = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

const getMongoUri = () => process.env.MONGO_URI || DEFAULT_MONGO_URI;

const getConnectionOptions = () => ({
  serverSelectionTimeoutMS: Number(process.env.MONGO_SERVER_SELECTION_TIMEOUT_MS || 10000),
  socketTimeoutMS: Number(process.env.MONGO_SOCKET_TIMEOUT_MS || 45000),
  maxPoolSize: Number(process.env.MONGO_MAX_POOL_SIZE || 10),
});

const registerConnectionListeners = () => {
  if (listenersRegistered) return;
  listenersRegistered = true;

  mongoose.connection.on('connected', () => {
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  });

  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err.message}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected');
  });
};

const clearReconnectTimer = () => {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
};

const scheduleReconnect = (delayMs = DEFAULT_RETRY_DELAY_MS) => {
  if (reconnectTimer || process.env.NODE_ENV === 'test') return;

  reconnectTimer = setTimeout(async () => {
    reconnectTimer = null;
    try {
      await connectdb({ retry: true, retryDelayMs: delayMs });
    } catch (err) {
      console.error(`MongoDB retry failed: ${err.message}`);
      scheduleReconnect(delayMs);
    }
  }, delayMs);
};

export const connectdb = async ({ retry = true, retryDelayMs = DEFAULT_RETRY_DELAY_MS } = {}) => {
  registerConnectionListeners();

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  const mongoUri = getMongoUri();

  connectionPromise = mongoose
    .connect(mongoUri, getConnectionOptions())
    .then((connection) => {
      clearReconnectTimer();
      return connection;
    })
    .catch((error) => {
      if (retry) {
        scheduleReconnect(retryDelayMs);
      }
      throw error;
    })
    .finally(() => {
      connectionPromise = null;
    });

  return connectionPromise;
};

export const closeDatabase = async () => {
  clearReconnectTimer();

  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
};

export const getDatabaseHealth = async () => {
  const readyState = mongoose.connection.readyState;
  const state = stateMap[readyState] || 'unknown';

  if (readyState !== 1) {
    return {
      status: 'unhealthy',
      state,
      uri: sanitizeMongoUri(getMongoUri()),
    };
  }

  const start = Date.now();
  await mongoose.connection.db.admin().ping();

  return {
    status: 'healthy',
    state,
    host: mongoose.connection.host,
    name: mongoose.connection.name,
    latency: `${Date.now() - start}ms`,
  };
};

export const onDatabaseConnected = (callback) => {
  registerConnectionListeners();
  mongoose.connection.on('connected', callback);

  if (mongoose.connection.readyState === 1) {
    setImmediate(callback);
  }
};

export const sanitizeMongoUri = (uri) =>
  uri.replace(/(mongodb(?:\+srv)?:\/\/)([^:@/]+):([^@/]+)@/i, '$1$2:***@');

export default connectdb;
