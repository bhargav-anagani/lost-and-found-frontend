import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ItemCard({ item }) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Format date/time exactly as stored (ignores timezone conversion)
  const formatExact = (dateStr) => {
    if (!dateStr) return 'N/A';
    // Replace 'T' with space, remove seconds and timezone
    return dateStr.replace('T', ' ').slice(0, 16); // e.g., "2025-10-19 17:30"
  };

  return (
    <>
      {/* Card Container */}
      <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 rounded-2xl shadow-md font-serif 
                      flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
        
        {/* Image Section */}
        {item.imageUrl && (
          <div 
            className="w-full md:w-1/3 h-64 bg-white rounded-lg shadow-md flex items-center justify-center 
                       cursor-pointer overflow-hidden"
            onClick={() => setIsZoomed(true)}
          >
            <img 
              src={item.imageUrl} 
              alt={item.itemName} 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}

        {/* Item Details Section */}
        <div className="flex-1 text-left">
          {/* LOST / FOUND Badge */}
          {item.type && (
            <div className="mb-2">
              <span 
                className={`px-3 py-1 rounded-lg text-white font-bold text-sm 
                  ${item.type === 'Lost' ? 'bg-red-600' : 'bg-green-600'}`}
              >
                {item.type.toUpperCase()}
              </span>
            </div>
          )}

          {/* Highlighted Name */}
          <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-black border-2 border-gray-500 
                          rounded-lg shadow-lg p-3 mb-4">
            <h3 className="font-bold text-white text-xl md:text-2xl">{item.itemName}</h3>
          </div>

          {/* Location */}
          <p className="text-sm md:text-base mb-2">
            <span className="font-bold text-black">Location:</span>
            <span className="ml-1 text-gray-900 font-sans">
              {item.type === 'Found' ? item.foundLocation || 'N/A' : item.lostLocation || 'N/A'}
            </span>
          </p>

          {/* Date/Time */}
          <p className="text-sm md:text-base mb-2">
            <span className="font-bold text-black">
              {item.type === 'Found' ? 'Found at:' : 'Lost at:'}
            </span>
            <span className="ml-1 text-gray-900 font-sans">
              {item.type === 'Found' 
                ? formatExact(item.foundDateTime) 
                : formatExact(item.lostDateTime)}
            </span>
          </p>

          {/* Holder / Contact */}
          <p className="text-sm md:text-base mb-2">
            <span className="font-bold text-black">
              {item.type === 'Found' ? 'Holder/Contact:' : 'Contact:'}
            </span>
            <span className="ml-1 text-gray-900 font-sans">
              {item.type === 'Found' 
                ? (item.currentHolder || 'Unknown') 
                : (item.contact || 'Unknown')}
            </span>
          </p>

          {item.uploadedByEmail && (
            <p className="text-sm md:text-base mb-2">
              <span className="font-bold text-black">Uploaded by:</span>
              <span className="ml-1 text-gray-900 font-sans">{item.uploadedByEmail}</span>
            </p>
          )}

          

          {/* Status */}
          <p className="text-sm md:text-base mb-2">
            <span className="font-bold text-black">Status:</span>
            <span className="ml-1 text-gray-900 font-sans">{item.status}</span>
          </p>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <img 
            src={item.imageUrl} 
            alt={item.itemName} 
            className="max-w-[90%] max-h-[90%] object-contain rounded-lg shadow-lg"
          />
        </div>
      )}
    </>
  );
}
