import React from 'react';

interface PropertyAboutProps {
  description?: string;
}

const PropertyAbout: React.FC<PropertyAboutProps> = ({ 
  description = `Skyline Towers is a sample 4BHK property listing used to demonstrate the property details page. The listing includes a structured description, location information, pricing, room configuration, and contact workflow.

This page shows how uploaded listing data can be displayed to users, including photos, amenities, schedule viewing requests, and map details. The content can be replaced with real property data through the backend and admin modules.` 
}) => {
  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-[#D4755B] rounded-full" />
        <h2 className="font-syne text-2xl text-[#0F172A]">
          About The Property
        </h2>
      </div>

      {/* Description */}
      <div className="space-y-4">
        {description.split('\n\n').map((paragraph, index) => (
          <p 
            key={index}
            className="font-manrope font-extralight text-base text-[#64748B] leading-relaxed"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PropertyAbout;
