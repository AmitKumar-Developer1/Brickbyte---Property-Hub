import dotenv from 'dotenv';
import connectdb, { closeDatabase, getDatabaseHealth, sanitizeMongoUri } from '../config/mongodb.js';

dotenv.config({ path: './.env.local' });
dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/brickbyte';

try {
  console.log(`Checking MongoDB: ${sanitizeMongoUri(mongoUri)}`);
  await connectdb({ retry: false });
  const health = await getDatabaseHealth();

  if (health.status !== 'healthy') {
    console.error('MongoDB is not healthy:', health);
    process.exitCode = 1;
  } else {
    console.log('MongoDB is healthy:', health);
  }
} catch (error) {
  console.error('MongoDB check failed:', error.message);
  console.error('Start MongoDB locally on port 27017 or set MONGO_URI in backend/.env.local.');
  process.exitCode = 1;
} finally {
  await closeDatabase();
}
