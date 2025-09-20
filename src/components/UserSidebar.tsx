import React, { useState } from 'react';
import { X, MapPin, CreditCard, User, Mail, Phone, Home, Navigation } from 'lucide-react';

interface UserSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserSidebar: React.FC<UserSidebarProps> = ({ isOpen, onClose }) => {
  const [userProfile, setUserProfile] = useState({
    firstName: 'Rahul',
    lastName: 'Kumar',
    email: 'rahul.kumar@email.com',
    phone: '+91 9876543210',
    address: 'Shastri Nagar, Ranchi, Jharkhand',
    pincode: '834001'
  });

  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const handleFetchLocation = async () => {
    setIsDetectingLocation(true);
    
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });
      });

      // Simulate reverse geocoding
      setTimeout(() => {
        setUserProfile(prev => ({
          ...prev,
          address: 'Current Location, Ranchi, Jharkhand',
          pincode: '834002'
        }));
        setIsDetectingLocation(false);
      }, 2000);
    } catch (error) {
      console.error('Error fetching location:', error);
      setIsDetectingLocation(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900">User Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt="User Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
              />
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors">
                <User size={12} />
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Name Fields */}
          {/* Employee ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employee ID
            </label>
            <input
              type="text"
              value={userProfile.employeeId}
              onChange={(e) => handleInputChange('employeeId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-50"
              readOnly
            />
          </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={userProfile.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={userProfile.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="tel"
                  value={userProfile.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Address */}
          {/* Department & Designation */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                type="text"
                value={userProfile.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Designation
              </label>
              <input
                type="text"
                value={userProfile.designation}
                onChange={(e) => handleInputChange('designation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Work Area */}
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Residential Address
              Assigned Work Area
              <div className="relative">
                <Home className="absolute left-3 top-3 text-gray-400" size={16} />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={userProfile.workArea}
                onChange={(e) => handleInputChange('workArea', e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              </div>
            </div>

            {/* Location and Pincode */}
          {/* Joining Date & Location Fetch */}
              <button
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Joining Date
              </label>
              <input
                type="date"
                value={userProfile.joiningDate}
                onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
                onClick={handleFetchLocation}
                disabled={isDetectingLocation}
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium mt-6"
                {isDetectingLocation ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Fetching...</span>
                  <span>Updating...</span>
                ) : (
                  <>
                    <Navigation size={16} />
                    <span>Fetch Location</span>
                  <span>Update Area</span>
                )}
              </button>
              <div>

            {/* DigiLocker Button */}
          {/* Supervisor Details */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supervisor Name
              </label>
              <input
                type="text"
                value={userProfile.supervisorName}
                onChange={(e) => handleInputChange('supervisorName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supervisor Phone
              </label>
              <input
                type="tel"
                value={userProfile.supervisorPhone}
                onChange={(e) => handleInputChange('supervisorPhone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
            {/* Additional Options */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                📊 My Reports History
              📊 My Resolution History
              <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                🏆 Credibility Score: 85/100
              🏆 Performance Score: 92/100
              <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                🔔 Notification Settings
              📋 Assigned Tasks: 12
              <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
          <h2 className="text-xl font-bold text-gray-900">Employee Profile</h2>
              ⏰ Work Schedule
              <button className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSidebar;
              src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"