'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { propertiesData, vehiclesData } from '../Listings/listings';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { FiMail, FiPhone, FiTwitter, FiLinkedin, FiFacebook, FiEdit, FiX } from 'react-icons/fi';

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    twitter: '',
    linkedin: '',
    facebook: '',
  });
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const parsedData = JSON.parse(userData);
      setCurrentUser(parsedData);
      setEditFormData({
        twitter: parsedData.socials?.twitter || '',
        linkedin: parsedData.socials?.linkedin || '',
        facebook: parsedData.socials?.facebook || '',
      });
    } else {
      // If no user data, redirect to login/registration
      router.push('/Registration');
    }
  }, [router]);

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  // Filter listings to find those belonging to the current user
  const userListings = [...propertiesData, ...vehiclesData].filter(
    (item) => item.agent?.name === currentUser?.fullName
  );

  const salesCount = userListings.filter(item => item.status === 'Sold').length;

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        socials: editFormData,
      };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      setIsEditModalOpen(false);
      toast.success('Profile updated successfully!');
    }
  };


  const StatCard = ({ label, value }) => (
    <div className="bg-white/10 p-4 rounded-lg text-center">
      <p className="text-2xl font-bold text-teal-400">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );

  const ListingCard = ({ item }) => (
    <Link href={`/Listings/${item.id}`}>
      <div className="bg-white/5 rounded-lg overflow-hidden group border border-gray-800 hover:border-teal-500 transition-all duration-300">
        <div className="relative">
          <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
          <div className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-full ${item.status === 'Active' ? 'bg-green-500/80 text-white' : 'bg-red-500/80 text-white'}`}>
            {item.status}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg truncate group-hover:text-teal-400">{item.name}</h3>
          <p className="text-gray-400 text-sm">{item.price}</p>
        </div>
      </div>
    </Link>
  );

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 mt-16 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white/5 p-8 rounded-2xl shadow-2xl border border-gray-800 md:flex gap-8 items-center">
          <div className="flex-shrink-0 mb-6 md:mb-0">
            <img src={currentUser.avatar} alt={currentUser.fullName} className="w-32 h-32 rounded-full border-4 border-teal-500 mx-auto" />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">{currentUser.fullName}</h1>
                <p className="text-teal-400">@{currentUser.userName} • <span className="capitalize">{currentUser.userType}</span></p>
              </div>
              <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 text-gray-300 hover:text-white border border-gray-600 px-3 py-1 rounded-lg">
                <FiEdit size={14} />
                <span>Edit Profile</span>
              </button>
            </div>
            <p className="text-gray-300 mt-4">{currentUser.bio}</p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-gray-400">
              <span className="flex items-center gap-2"><FiMail /> {currentUser.email || 'N/A'}</span>
              <span className="flex items-center gap-2"><FiPhone /> {currentUser.phoneNumber || 'N/A'}</span>
            </div>
            <div className="mt-4 flex items-center gap-4">
              {currentUser.socials?.twitter && <a href={currentUser.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400"><FiTwitter size={20} /></a>}
              {currentUser.socials?.linkedin && <a href={currentUser.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400"><FiLinkedin size={20} /></a>}
              {currentUser.socials?.facebook && <a href={currentUser.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400"><FiFacebook size={20} /></a>}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Listings" value={userListings.length} />
          <StatCard label="Properties Sold" value={salesCount} />
          <StatCard label="Profile Views" value="1.2k" />
          <StatCard label="Member Since" value="2023" />
        </div>

        {/* User's Listings */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-teal-400 mb-6">My Listings</h2>
          {userListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userListings.map(item => (
                <ListingCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/5 rounded-lg border border-gray-800">
              <p className="text-gray-400">You haven't listed any items yet.</p>
              <Link href="/Listings/add" className="mt-4 inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg">
                Create a Listing
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-xl font-bold text-teal-400">Edit Social Links</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-white">
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleEditFormSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="twitter" className="block text-sm font-medium text-gray-400 mb-1">Twitter URL</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400"><FiTwitter /></span>
                  <input type="url" id="twitter" name="twitter" value={editFormData.twitter} onChange={handleEditFormChange} placeholder="https://twitter.com/username" className="w-full pl-10 bg-gray-800 border border-gray-600 rounded-lg p-2 text-white outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
              </div>
              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-400 mb-1">LinkedIn URL</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400"><FiLinkedin /></span>
                  <input type="url" id="linkedin" name="linkedin" value={editFormData.linkedin} onChange={handleEditFormChange} placeholder="https://linkedin.com/in/username" className="w-full pl-10 bg-gray-800 border border-gray-600 rounded-lg p-2 text-white outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
              </div>
              <div>
                <label htmlFor="facebook" className="block text-sm font-medium text-gray-400 mb-1">Facebook URL</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400"><FiFacebook /></span>
                  <input type="url" id="facebook" name="facebook" value={editFormData.facebook} onChange={handleEditFormChange} placeholder="https://facebook.com/username" className="w-full pl-10 bg-gray-800 border border-gray-600 rounded-lg p-2 text-white outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg font-semibold">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;