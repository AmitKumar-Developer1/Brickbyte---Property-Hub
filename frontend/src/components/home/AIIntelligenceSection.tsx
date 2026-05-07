import React from 'react';

const AIIntelligenceSection: React.FC = () => {
  return (
    <section className="bg-[#F8F6F6] py-24">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="font-space-mono text-sm text-[#D4755B] uppercase tracking-widest mb-4">Project Modules</div>
          <h2 className="font-fraunces text-5xl text-[#111827] mb-6">Assisted Property Search</h2>
          <p className="font-manrope font-light text-lg text-[#4b5563] max-w-[740px] mx-auto">
            The project demonstrates how listing data, filters, and generated summaries can support
            a real estate search workflow.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white border border-[#f3f4f6] rounded-2xl p-8 shadow-[0px_20px_25px_-5px_rgba(229,231,235,0.5)]">
            <div className="w-14 h-14 bg-[rgba(212,117,91,0.1)] rounded-xl flex items-center justify-center mb-6">
              <span className="font-material-icons text-3xl text-[#D4755B]">query_stats</span>
            </div>
            <h3 className="font-syne font-bold text-2xl text-[#111827] mb-4">Live Market Scraping</h3>
            <p className="font-manrope text-base text-[#6b7280] leading-relaxed">
              The backend can collect listing details from configured sources and normalize them for
              search and comparison.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white border border-[#f3f4f6] rounded-2xl p-8 shadow-[0px_20px_25px_-5px_rgba(229,231,235,0.5)]">
            <div className="w-14 h-14 bg-[rgba(212,117,91,0.1)] rounded-xl flex items-center justify-center mb-6">
              <span className="font-material-icons text-3xl text-[#D4755B]">psychology</span>
            </div>
            <h3 className="font-syne font-bold text-2xl text-[#111827] mb-4">Generated Summaries</h3>
            <p className="font-manrope text-base text-[#6b7280] leading-relaxed">
              Generated notes summarize listing value, location details, and comparison points for
              project demonstration.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white border border-[#f3f4f6] rounded-2xl p-8 shadow-[0px_20px_25px_-5px_rgba(229,231,235,0.5)]">
            <div className="w-14 h-14 bg-[rgba(212,117,91,0.1)] rounded-xl flex items-center justify-center mb-6">
              <span className="font-material-icons text-3xl text-[#D4755B]">location_city</span>
            </div>
            <h3 className="font-syne font-bold text-2xl text-[#111827] mb-4">Area Suggestions</h3>
            <p className="font-manrope text-base text-[#6b7280] leading-relaxed">
              Area suggestions are based on selected city, locality, property type, and available
              listing attributes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIIntelligenceSection;
