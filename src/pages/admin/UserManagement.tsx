
import React, { useEffect, useState } from 'react';
import { User } from '../../types';
import { userService } from '../../services/api';
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

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState({
    title: '',
    message: '',
    confirmButtonText: '',
    confirmButtonClass: '',
    onConfirm: () => {}
  });
  
  const { showToast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAllUsers();
      if (response.success) {
        setUsers(response.users);
      } else {
        showToast('Failed to load users', 'error');
      }
    } catch (error: any) {
      console.error('Error fetching users:', error);
      showToast(error.response?.data?.message || 'Error loading users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (user: User) => {
    setSelectedUser(user);
    const newStatus = user.status === 'active' ? 'banned' : 'active';
    
    setModalProps({
      title: `${newStatus === 'active' ? 'Activate' : 'Ban'} User`,
      message: `Are you sure you want to ${newStatus === 'active' ? 'activate' : 'ban'} ${user.full_name}?`,
      confirmButtonText: newStatus === 'active' ? 'Activate' : 'Ban',
      confirmButtonClass: newStatus === 'active' ? 'btn-green' : 'btn-red',
      onConfirm: () => confirmStatusChange(user.id, newStatus)
    });
    
    setIsModalOpen(true);
  };

  const confirmStatusChange = async (userId: number, status: string) => {
    try {
      const response = await userService.updateUserStatus(userId, status);
      if (response.success) {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, status: status as 'active' | 'inactive' | 'banned' } : user
        ));
        showToast(`User ${status === 'active' ? 'activated' : 'banned'} successfully`, 'success');
      } else {
        showToast(response.message || `Failed to update user status`, 'error');
      }
    } catch (error: any) {
      console.error('Error updating user status:', error);
      showToast(error.response?.data?.message || 'Error updating user status', 'error');
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleRoleChange = (user: User) => {
    setSelectedUser(user);
    const newRole = user.role === 'user' ? 'admin' : 'user';
    
    setModalProps({
      title: `Change User Role`,
      message: `Are you sure you want to change ${user.full_name}'s role to ${newRole}?`,
      confirmButtonText: 'Change Role',
      confirmButtonClass: 'btn-yellow',
      onConfirm: () => confirmRoleChange(user.id, newRole)
    });
    
    setIsModalOpen(true);
  };

  const confirmRoleChange = async (userId: number, role: string) => {
    try {
      const response = await userService.updateUserRole(userId, role);
      if (response.success) {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, role: role as 'admin' | 'user' } : user
        ));
        showToast(`User role changed successfully`, 'success');
      } else {
        showToast(response.message || `Failed to update user role`, 'error');
      }
    } catch (error: any) {
      console.error('Error updating user role:', error);
      showToast(error.response?.data?.message || 'Error updating user role', 'error');
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    
    setModalProps({
      title: 'Delete User',
      message: `Are you sure you want to delete ${user.full_name}? This action cannot be undone.`,
      confirmButtonText: 'Delete',
      confirmButtonClass: 'btn-red',
      onConfirm: () => confirmDeleteUser(user.id)
    });
    
    setIsModalOpen(true);
  };

  const confirmDeleteUser = async (userId: number) => {
    try {
      const response = await userService.deleteUser(userId);
      if (response.success) {
        setUsers(users.filter(user => user.id !== userId));
        showToast('User deleted successfully', 'success');
      } else {
        showToast(response.message || 'Failed to delete user', 'error');
      }
    } catch (error: any) {
      console.error('Error deleting user:', error);
      showToast(error.response?.data?.message || 'Error deleting user', 'error');
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      
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
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Role</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Created At</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr className="table-row">
                  <td colSpan={7} className="px-6 py-4 text-center">No users found</td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id} className="table-row">
                    <td className="px-6 py-4">{user.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {user.full_name}
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4 capitalize">{user.role}</td>
                    <td className="px-6 py-4">
                      <span 
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 
                          user.status === 'banned' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{new Date(user.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleStatusChange(user)}
                          className={`btn ${user.status === 'active' ? 'btn-red' : 'btn-green'} text-xs py-1`}
                        >
                          {user.status === 'active' ? 'Ban' : 'Activate'}
                        </button>
                        <button 
                          onClick={() => handleRoleChange(user)}
                          className="btn btn-yellow text-xs py-1"
                        >
                          {user.role === 'user' ? 'Make Admin' : 'Make User'}
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user)}
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
        isOpen={isModalOpen}
        title={modalProps.title}
        message={modalProps.message}
        onConfirm={modalProps.onConfirm}
        onCancel={() => setIsModalOpen(false)}
        confirmButtonText={modalProps.confirmButtonText}
        confirmButtonClass={modalProps.confirmButtonClass}
      />
    </div>
  );
};

export default UserManagement;
