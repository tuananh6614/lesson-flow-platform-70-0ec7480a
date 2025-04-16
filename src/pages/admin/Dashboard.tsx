
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../../components/layout/Layout';
import UserManagement from './UserManagement';
import CourseManagement from './CourseManagement';

const tabs = [
  { id: 'users', label: 'User Management' },
  { id: 'courses', label: 'Course Management' }
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('users');

  // If user is not admin, redirect to home
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage users, courses, and system settings</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
          {tabs.map(tab => (
            <li key={tab.id} className="mr-2">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center justify-center p-4 rounded-t-lg ${
                  activeTab === tab.id 
                    ? 'text-blue-600 border-b-2 border-blue-600 active'
                    : 'hover:text-gray-600 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'courses' && <CourseManagement />}
      </div>
    </Layout>
  );
};

export default Dashboard;
