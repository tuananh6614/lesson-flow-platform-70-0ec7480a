
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { authService } from '../../services/api';
import Layout from '../../components/layout/Layout';

const Profile: React.FC = () => {
  const { user, updateCurrentUser } = useAuth();
  const { showToast } = useToast();
  
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  // Password change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChangeMode, setPasswordChangeMode] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      showToast('You must be logged in to update your profile', 'error');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await authService.updateProfile(user.id, {
        full_name: fullName
      });
      
      if (response.success) {
        updateCurrentUser({ full_name: fullName });
        showToast('Profile updated successfully', 'success');
        setEditMode(false);
      } else {
        showToast('Failed to update profile', 'error');
      }
    } catch (error: any) {
      console.error('Profile update error:', error);
      showToast(error.response?.data?.message || 'Error updating profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      showToast('You must be logged in to change your password', 'error');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    
    if (newPassword.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }
    
    setPasswordLoading(true);
    
    try {
      const response = await authService.changePassword(user.id, {
        currentPassword,
        newPassword
      });
      
      if (response.success) {
        showToast('Password changed successfully', 'success');
        setPasswordChangeMode(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showToast(response.message || 'Failed to change password', 'error');
      }
    } catch (error: any) {
      console.error('Password change error:', error);
      showToast(error.response?.data?.message || 'Error changing password', 'error');
    } finally {
      setPasswordLoading(false);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">You need to be logged in to view your profile</h2>
            <a href="/login" className="btn btn-primary">Login</a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Profile information section */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Profile Information</h1>
              <p className="text-gray-600">Update your account information</p>
            </div>
            
            {editMode ? (
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={user.email}
                    className="input-field bg-gray-100"
                    disabled
                  />
                  <p className="text-sm text-gray-500 mt-1">Email cannot be changed as it's used for login</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button 
                    type="submit"
                    disabled={loading}
                    className={`btn btn-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setFullName(user.full_name);
                      setEditMode(false);
                    }}
                    className="btn btn-gray"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-700">Full Name</h2>
                  <p className="text-gray-900">{user.full_name}</p>
                </div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-700">Email</h2>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-700">Role</h2>
                  <p className="text-gray-900 capitalize">{user.role}</p>
                </div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-700">Account Status</h2>
                  <p className={`capitalize ${
                    user.status === 'active' ? 'text-green-600' : 
                    user.status === 'banned' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {user.status}
                  </p>
                </div>
                
                <button 
                  onClick={() => setEditMode(true)}
                  className="btn btn-primary"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Password change section */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Security</h1>
              <p className="text-gray-600">Update your password</p>
            </div>
            
            {passwordChangeMode ? (
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="form-group">
                  <label htmlFor="currentPassword" className="form-label">Current Password</label>
                  <input 
                    type="password" 
                    id="currentPassword" 
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input 
                    type="password" 
                    id="newPassword" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <button 
                    type="submit"
                    disabled={passwordLoading}
                    className={`btn btn-primary ${passwordLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {passwordLoading ? 'Changing Password...' : 'Change Password'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setCurrentPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                      setPasswordChangeMode(false);
                    }}
                    className="btn btn-gray"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600 mb-4">
                  Your password should be at least 6 characters and include a mix of letters and numbers for better security.
                </p>
                
                <button 
                  onClick={() => setPasswordChangeMode(true)}
                  className="btn btn-primary"
                >
                  Change Password
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
