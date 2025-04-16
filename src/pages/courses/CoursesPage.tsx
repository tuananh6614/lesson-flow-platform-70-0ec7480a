
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { courseService } from '../../services/api';
import { Course } from '../../types';
import Layout from '../../components/layout/Layout';
import { useToast } from '../../contexts/ToastContext';

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive' | 'maintenance'>('all');
  
  const { showToast } = useToast();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await courseService.getAllCourses();
      if (response.success) {
        setCourses(response.courses);
      } else {
        showToast('Failed to load courses', 'error');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      showToast('Error loading courses. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">All Courses</h1>
        <p className="text-gray-600 mt-2">Browse all available courses</p>
      </div>

      {/* Filters */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              id="search"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="md:w-48">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="input-field"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <p className="text-gray-600">No courses found matching your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="card">
              <img
                className="rounded-t-lg h-48 w-full object-cover"
                src={course.thumbnail}
                alt={course.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=No+Image';
                }}
              />
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900">{course.title}</h3>
                  <span 
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      course.status === 'active' ? 'bg-green-100 text-green-800' : 
                      course.status === 'inactive' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
                <p className="font-normal text-gray-700 line-clamp-3 mb-3">
                  {course.description}
                </p>
                <Link 
                  to={`/courses/${course.id}`} 
                  className={`btn ${course.status === 'active' ? 'btn-primary' : 'btn-gray cursor-not-allowed'}`}
                  onClick={(e) => {
                    if (course.status !== 'active') {
                      e.preventDefault();
                      showToast(`This course is currently ${course.status}`, 'info');
                    }
                  }}
                >
                  {course.status === 'active' ? 'View Course' : 'Not Available'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default CoursesPage;
