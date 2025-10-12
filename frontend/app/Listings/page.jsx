"use client";
import React, { useState } from 'react';


const propertiesData = [
  { id: 1, name: 'Luxury Villa', status:'Active', price: '$1,200,000', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop' },
  { id: 2, name: 'Cozy Cottage', status:'Sold', price: '$450,000', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop' },
  { id: 3, name: 'Modern Apartment', status:'Active', price: '$750,000', image: 'https://images.unsplash.com/photo-1493809842344-ab6181ba96a2?q=80&w=2070&auto=format&fit=crop' },
  { id: 4, name: 'Beach House', status:'Active', price: '$980,000', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop' },
  { id: 5, name: 'Mountain Cabin', status:'Sold', price: '$600,000', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=2070&auto=format&fit=crop' },
  { id: 6, name: 'Urban Loft', status:'Active', price: '$820,000', image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop' },
];

const vehiclesData = [
  { id: 1, name: 'Sports Car', status: 'Active', price: '$80,000', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop' },
  { id: 2, name: 'SUV', status: 'Active', price: '$55,000', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop' },
  { id: 3, name: 'Electric Bike', status: 'Sold', price: '$5,000', image: 'https://images.unsplash.com/photo-1622093393794-45c5b8a43429?q=80&w=1932&auto=format&fit=crop' },
  { id: 4, name: 'Convertible', status: 'Sold', price: '$65,000', image: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?q=80&w=2070&auto=format&fit=crop' },
  { id: 5, name: 'Pickup Truck', status: 'Active', price: '$40,000', image: 'https://images.unsplash.com/photo-1519648023493-d82b5f8d7b8a?q=80&w=2070&auto=format&fit=crop' },
  { id: 6, name: 'Classic Motorcycle', status: 'Active', price: '$12,000', image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?q=80&w=2070&auto=format&fit=crop' },
];

const PropertyCard = ({ property }) => (
  <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
    <img src={property.image} alt={property.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <div className='flex justify-between items-center'  >
        <h3 className="text-xl font-bold">{property.name}</h3>
        <p className='bold text-gray-200 text-sm'>{property.status}</p>
      </div>
      <p className="text-teal-400 mt-2">{property.price}</p>
    </div>
  </div>
);


const VehicleCard = ({ vehicle }) => (
  <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
    <img src={vehicle.image} alt={vehicle.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <div className='flex justify-between items-center'>
        <h3 className="text-xl font-bold">{vehicle.name}</h3>
        <p className='bold text-gray-200 text-sm'>{vehicle.status}</p>
      </div>
      <p className="text-teal-400 mt-2">{vehicle.price}</p>
    </div>
  </div>
);

const PropertiesComponent = () => (
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
);

const VehiclesComponent = () => (
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
);

const Page = () => {
  const [activeView, setActiveView] = useState('properties');

  return (
    <>
        <div className='mb-32 mt-24'>
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
                  {activeView === 'properties' && <PropertiesComponent />}
                  {activeView === 'vehicles' && <VehiclesComponent />}
                </div>
             </div>
        </div>
    </>
  )
}

export default Page;