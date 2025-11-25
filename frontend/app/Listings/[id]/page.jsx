import React from 'react';
import Link from 'next/link';
import { FiMapPin, FiHome, FiGrid, FiDollarSign, FiStar, FiUser, FiPhone, FiMail, FiAward } from 'react-icons/fi';
import { propertiesData, vehiclesData } from '../listings';
import { leaderboardData } from '../../Leaderboard/leaderboard';

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
  const agentRankData = item ? leaderboardData.find(agent => agent.name === item.agent?.name) : null;

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-2xl">Item not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 sm:py-12 mt-20 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/Listings" className="text-teal-400 hover:text-teal-100">← Back to Listings</Link>
        </div>

        <div className="bg-white/5 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 w-full">
              <div className="w-full h-64 sm:h-80 md:h-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  style={{ maxHeight: '640px' }}
                />
              </div>
            </div>

            <div className="md:w-1/2 w-full p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-400 leading-tight">{item.name}</h1>
                  <p className="text-gray-300 mt-2 text-sm sm:text-base">
                    {isVehicle ? `${item.brand}${item.year ? ' • ' + item.year : ''}` : item.location}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <span className={`text-sm sm:text-base font-semibold px-3 py-1 rounded-full ${item.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                    {item.status}
                  </span>
                </div>
              </div>

              <p className="text-gray-300 mt-6 mb-6 text-sm sm:text-base leading-relaxed">{item.description}</p>

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

        {item.agent && (
          <div className="mt-8 sm:mt-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-teal-400 mb-4 sm:mb-6">Listed By</h2>
            <div className="bg-white/10 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img src={item.agent.avatar} alt={item.agent.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-teal-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg sm:text-2xl font-bold truncate">{item.agent.name}</h3>
                    {agentRankData && (
                      <div className="flex items-center gap-1 bg-teal-500/20 text-teal-300 px-2 py-1 rounded-full text-xs sm:text-sm font-semibold">
                        <FiAward />
                        <span>Rank #{agentRankData.rank}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-400 mt-2">
                  <FiMapPin />
                  <span className="text-sm truncate">{item.agent.location}</span>
                </div>

                <div className="flex items-center gap-4 mt-4 flex-wrap">
                  {item.agent.phone && (
                    <a href={`tel:${item.agent.phone}`} className="flex items-center gap-2 text-teal-400 hover:underline text-sm">
                      <FiPhone />
                      <span>{item.agent.phone}</span>
                    </a>
                  )}
                  {item.agent.email && (
                    <a href={`mailto:${item.agent.email}`} className="flex items-center gap-2 text-teal-400 hover:underline text-sm">
                      <FiMail />
                      <span className="truncate">{item.agent.email}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {item.reviews && item.reviews.length > 0 && (
          <div className="mt-8 sm:mt-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-teal-400 mb-4 sm:mb-6">Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {item.reviews.map((review) => (
                <div key={review.id} className="bg-white/10 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-800 backdrop-blur-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <img src={review.avatar} alt={review.author} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-2 border-2 border-teal-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-sm sm:text-lg">{review.author}</h4>
                        <p className="text-xs sm:text-sm text-gray-400">{review.date}</p>
                      </div>
                    </div>
                    <div className="ml-4">
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {(!item.reviews || item.reviews.length === 0) && (
          <p className="text-center text-gray-400 mt-8 sm:mt-12">No reviews for this item yet.</p>
        )}
      </div>
    </div>
  );
};

export default ItemDetailsPage;
