import React from 'react';
import Link from 'next/link';
import { FiMapPin, FiHome, FiGrid, FiDollarSign, FiStar } from 'react-icons/fi';
import { propertiesData, vehiclesData } from '../listings';

const StarRating = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <FiStar key={i} className={`mr-1 ${i < rating ? 'text-teal-400 fill-current' : 'text-gray-600'}`} />
    ))}
  </div>
);

const ItemDetailsPage = ({ params }) => {
  const id = parseInt(params.id, 10);

  const property = propertiesData.find((p) => p.id === id);
  const vehicle = vehiclesData.find((v) => v.id === id);

  const item = property || vehicle;
  const isVehicle = !!vehicle;

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-2xl">Item not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/Listings" className="text-teal-400 hover:underline">← Back to Listings</Link>
        </div>

        <div className="bg-white/5 rounded-2xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img src={item.image} alt={item.name} className="w-full h-96 object-cover" />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-teal-400">{item.name}</h1>
                  <p className="text-gray-300 mt-2">{isVehicle ? item.brand + ' • ' + (item.year || '') : item.location}</p>
                </div>
                <div>
                  <span className={`text-lg font-semibold px-4 py-1 rounded-full ${item.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                    {item.status}
                  </span>
                </div>
              </div>

              <p className="text-gray-300 mt-6 mb-6">{item.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <FiDollarSign className="text-teal-400" size={20} />
                  <div>
                    <div className="text-sm text-gray-400">Price</div>
                    <div className="font-semibold">{item.price}</div>
                  </div>
                </div>

                {isVehicle ? (
                  <>
                    <div className="flex items-center gap-3">
                      <FiHome className="text-teal-400" size={20} />
                      <div>
                        <div className="text-sm text-gray-400">Brand</div>
                        <div className="font-semibold">{item.brand}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiMapPin className="text-teal-400" size={20} />
                      <div>
                        <div className="text-sm text-gray-400">Fuel Type</div>
                        <div className="font-semibold">{item.fuelType}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiGrid className="text-teal-400" size={20} />
                      <div>
                        <div className="text-sm text-gray-400">Year</div>
                        <div className="font-semibold">{item.year}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiGrid className="text-teal-400" size={20} />
                      <div>
                        <div className="text-sm text-gray-400">Color</div>
                        <div className="font-semibold">{item.color}</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <FiHome className="text-teal-400" size={20} />
                      <div>
                        <div className="text-sm text-gray-400">Type</div>
                        <div className="font-semibold">{item.type}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiMapPin className="text-teal-400" size={20} />
                      <div>
                        <div className="text-sm text-gray-400">Location</div>
                        <div className="font-semibold">{item.location}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiGrid className="text-teal-400" size={20} />
                      <div>
                        <div className="text-sm text-gray-400">Bedrooms</div>
                        <div className="font-semibold">{item.bedrooms}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiGrid className="text-teal-400" size={20} />
                      <div>
                        <div className="text-sm text-gray-400">Land Size</div>
                        <div className="font-semibold">{item.landSize}</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {item.reviews && item.reviews.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-teal-400 mb-6">Reviews</h2>
            <div className="space-y-8">
              {item.reviews.map((review) => (
                <div key={review.id} className="bg-white/10 p-6 rounded-2xl shadow-lg border border-gray-800 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full mr-4 border-2 border-teal-500" />
                      <div>
                        <h4 className="font-bold text-lg">{review.author}</h4>
                        <p className="text-sm text-gray-400">{review.date}</p>
                      </div>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-gray-300 leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {(!item.reviews || item.reviews.length === 0) && (
            <p className="text-center text-gray-400 mt-12">No reviews for this item yet.</p>
        )}
      </div>
    </div>
  );
};

export default ItemDetailsPage;
