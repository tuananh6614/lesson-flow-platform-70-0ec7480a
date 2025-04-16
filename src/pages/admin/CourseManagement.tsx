
import React, { useEffect, useState } from 'react';
import { Course } from '../../types';
import { courseService } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';

// Modal component for confirmation
interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonText: string;
  confirmButtonClass?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmButtonText,
  confirmButtonClass = 'btn-red'
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-base leading-relaxed text-gray-500">{message}</p>
          <div className="flex items-center space-x-3">
            <button
              onClick={onCancel}
              className="btn btn-gray"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`btn ${confirmButtonClass}`}
            >
              {confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Form modal for course create/edit
interface CourseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (courseData: Partial<Course>) => void;
  course: Partial<Course> | null;
  isLoading: boolean;
}

const CourseFormModal: React.FC<CourseFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  course,
  isLoading
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive' | 'maintenance'>('active');

  useEffect(() => {
    if (course) {
      setTitle(course.title || '');
      setDescription(course.description || '');
      setThumbnail(course.thumbnail || '');
      setStatus(course.status || 'active');
    } else {
      // Reset form when creating new
      setTitle('');
      setDescription('');
      setThumbnail('');
      setStatus('active');
    }
  }, [course]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      thumbnail,
      status
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              {course && course.id ? 'Edit Course' : 'Create New Course'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-field"
                rows={4}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="thumbnail" className="form-label">Thumbnail URL</label>
              <input
                id="thumbnail"
                type="text"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="input-field"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as 'active' | 'inactive' | 'maintenance')}
                className="input-field"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-gray"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`btn btn-primary ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Saving...' : 'Save Course'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [confirmModalProps, setConfirmModalProps] = useState({
    title: '',
    message: '',
    confirmButtonText: '',
    confirmButtonClass: '',
    onConfirm: () => {}
  });
  
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
    } catch (error: any) {
      console.error('Error fetching courses:', error);
      showToast(error.response?.data?.message || 'Error loading courses', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = () => {
    setSelectedCourse(null);
    setIsFormModalOpen(true);
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsFormModalOpen(true);
  };

  const handleDeleteCourse = (course: Course) => {
    setSelectedCourse(course);
    
    setConfirmModalProps({
      title: 'Delete Course',
      message: `Are you sure you want to delete "${course.title}"? This action cannot be undone.`,
      confirmButtonText: 'Delete',
      confirmButtonClass: 'btn-red',
      onConfirm: () => confirmDeleteCourse(course.id)
    });
    
    setIsConfirmModalOpen(true);
  };

  const confirmDeleteCourse = async (courseId: number) => {
    try {
      const response = await courseService.deleteCourse(courseId);
      if (response.success) {
        setCourses(courses.filter(course => course.id !== courseId));
        showToast('Course deleted successfully', 'success');
      } else {
        showToast(response.message || 'Failed to delete course', 'error');
      }
    } catch (error: any) {
      console.error('Error deleting course:', error);
      showToast(error.response?.data?.message || 'Error deleting course', 'error');
    } finally {
      setIsConfirmModalOpen(false);
    }
  };

  const handleSubmitCourse = async (courseData: Partial<Course>) => {
    setFormLoading(true);
    
    try {
      if (selectedCourse && selectedCourse.id) {
        // Update existing course
        const response = await courseService.updateCourse(selectedCourse.id, courseData);
        if (response.success) {
          setCourses(courses.map(c => 
            c.id === selectedCourse.id ? { ...c, ...courseData } : c
          ));
          showToast('Course updated successfully', 'success');
          setIsFormModalOpen(false);
        } else {
          showToast(response.message || 'Failed to update course', 'error');
        }
      } else {
        // Create new course
        const response = await courseService.createCourse(courseData);
        if (response.success) {
          fetchCourses(); // Refetch to get the new course with all data
          showToast('Course created successfully', 'success');
          setIsFormModalOpen(false);
        } else {
          showToast(response.message || 'Failed to create course', 'error');
        }
      }
    } catch (error: any) {
      console.error('Error saving course:', error);
      showToast(error.response?.data?.message || 'Error saving course', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Management</h1>
        <button 
          onClick={handleCreateCourse}
          className="btn btn-primary"
        >
          Create New Course
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">Title</th>
                <th scope="col" className="px-6 py-3">Thumbnail</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Created At</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr className="table-row">
                  <td colSpan={6} className="px-6 py-4 text-center">No courses found</td>
                </tr>
              ) : (
                courses.map(course => (
                  <tr key={course.id} className="table-row">
                    <td className="px-6 py-4">{course.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {course.title}
                    </td>
                    <td className="px-6 py-4">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title} 
                        className="w-16 h-10 object-cover rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/160x100?text=No+Image';
                        }}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          course.status === 'active' ? 'bg-green-100 text-green-800' : 
                          course.status === 'inactive' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{new Date(course.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditCourse(course)}
                          className="btn btn-yellow text-xs py-1"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteCourse(course)}
                          className="btn btn-red text-xs py-1"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        title={confirmModalProps.title}
        message={confirmModalProps.message}
        onConfirm={confirmModalProps.onConfirm}
        onCancel={() => setIsConfirmModalOpen(false)}
        confirmButtonText={confirmModalProps.confirmButtonText}
        confirmButtonClass={confirmModalProps.confirmButtonClass}
      />
      
      <CourseFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleSubmitCourse}
        course={selectedCourse}
        isLoading={formLoading}
      />
    </div>
  );
};

export default CourseManagement;
