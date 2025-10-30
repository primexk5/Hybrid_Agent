'use client';
import React from 'react';
import { FiStar } from 'react-icons/fi';

const reviewsData = [
  {
    id: 1,
    author: 'Sarah L.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    date: 'October 26, 2023',
    text: 'Working with HYBRIDAGENT was a seamless experience. They helped me find the perfect property in no time. Their professionalism and dedication are unmatched. Highly recommended!',
  },
  {
    id: 2,
    author: 'Michael B.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    date: 'September 15, 2023',
    text: 'I sold my sports car through them and got a fantastic price. The process was transparent and incredibly fast. I couldn\'t be happier with the service.',
  },
  {
    id: 3,
    author: 'Jessica P.',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 4,
    date: 'August 02, 2023',
    text: 'A great platform for browsing high-quality listings. The agents are responsive and knowledgeable. The only thing I\'d wish for is more filter options on the vehicle page.',
  },
  {
    id: 4,
    author: 'David H.',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    rating: 5,
    date: 'July 21, 2023',
    text: 'From the initial consultation to closing the deal on our new home, the team was exceptional. They truly listen to your needs and deliver beyond expectations.',
  },
];

const StarRating = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <FiStar key={i} className={`mr-1 ${i < rating ? 'text-teal-400 fill-current' : 'text-gray-600'}`} />
    ))}
  </div>
);

const ReviewPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-mono text-center text-teal-700 mb-4">What Our Clients Say</h1>
        <p className="text-center text-gray-400 mb-12">Real reviews from satisfied customers who found their dream properties and vehicles with us.</p>
        <div className="space-y-8">
          {reviewsData.map((review) => (
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
    </div>
  );
};

export default ReviewPage;