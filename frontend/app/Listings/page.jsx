'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { propertiesData, vehiclesData } from './listings';

const PropertyCard = ({ property }) => (
  <Link href={`/Listings/${property.id}`} className="block">
    <div className="bg-white/15 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      <img src={property.image} alt={property.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className='flex justify-between items-center'  >
          <h3 className="text-xl font-bold">{property.name}</h3>
          <p className='bold text-gray-200 text-sm'>{property.status}</p>
        </div>
        <p className="text-teal-400 mt-2">{property.price}</p>
      </div>
    </div>
  </Link>
);


const VehicleCard = ({ vehicle }) => (
  <Link href={`/Listings/${vehicle.id}`} className="block">
    <div className="bg-white/15  rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      <img src={vehicle.image} alt={vehicle.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className='flex justify-between items-center'>
          <h3 className="text-xl font-bold">{vehicle.name}</h3>
          <p className='bold text-gray-200 text-sm'>{vehicle.status}</p>
        </div>
        <p className="text-teal-400 mt-2">{vehicle.price}</p>
      </div>
    </div>
  </Link>
);

const Page = () => {
  const [activeView, setActiveView] = useState('properties');

  return (
    <>
        <div className='mb-32 bg-black mt-24'>
             <div className='px-4 md:px-10 lg:px-20 xl:px-60 flex flex-col'>
                <h4 className='text-2xl font-mono mb-3'><b>Listings</b></h4>
                <div className='flex gap-2 items-center'>
                  <button className={`hover:text-teal-700 text-xl font-mono ${activeView === 'properties' ? 'text-teal-800 underline' : 'text-gray-400'}`} onClick={() => setActiveView('properties')}>
                    Properties
                  </button>
                  <p className="text-gray-400">/</p>
                  <button className={`hover:text-teal-700 text-xl font-mono ${activeView === 'vehicles' ? 'text-teal-800 underline' : 'text-gray-400'}`} onClick={() => setActiveView('vehicles')}>
                    Vehicles
                  </button>
                </div>
                <div>
                  {activeView === 'properties' && (
                    <div className="mt-8 text-white">
                      <h2 className="text-2xl font-bold mb-4">Properties for Sale</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {propertiesData.length > 0 ? (
                          propertiesData.map(property => <PropertyCard key={property.id} property={property} />)
                        ) : (
                          <p>No properties listed yet. Check back soon!</p>
                        )}
                      </div>
                    </div>
                  )}

                  {activeView === 'vehicles' && (
                    <div className="mt-8 text-white">
                      <h2 className="text-2xl font-bold mb-4">Vehicles for Sale</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {vehiclesData.length > 0 ? (
                          vehiclesData.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} />)
                        ) : (
                          <p>No vehicles listed yet. Check back soon!</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
             </div>
        </div>
    </>
  )
}

export default Page;