import React, { useState, useEffect } from 'react';
import { Edit, Trash2, UserPlus, Key } from 'lucide-react';
import localforage from 'localforage';
import { updateUserPassword } from '../services/database';

interface User {
  id: string;
  email: string;
  role: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ email: '', role: 'team' });
  const [notification, setNotification] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [passwordChangeData, setPasswordChangeData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const storedUsers = await localforage.getItem<User[]>('users') || [];
      setUsers(storedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      setNotification('Error fetching users. Please try again.');
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newUserWithId = { ...newUser, id: Date.now().toString() };
      const updatedUsers = [...users, newUserWithId];
      await localforage.setItem('users', updatedUsers);
      setUsers(updatedUsers);
      setNewUser({ email: '', role: 'team' });
      setNotification('User added successfully!');
    } catch (error) {
      console.error('Error adding user:', error);
      setNotification('Error adding user. Please try again.');
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const updatedUsers = users.filter(user => user.id !== id);
      await localforage.setItem('users', updatedUsers);
      setUsers(updatedUsers);
      setNotification('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      setNotification('Error deleting user. Please try again.');
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    if (passwordChangeData.newPassword !== passwordChangeData.confirmPassword) {
      setNotification('New passwords do not match.');
      return;
    }

    try {
      await updateUserPassword(
        selectedUser.email,
        passwordChangeData.currentPassword,
        passwordChangeData.newPassword
      );
      setNotification('Password updated successfully!');
      setSelectedUser(null);
      setPasswordChangeData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error updating password:', error);
      setNotification('Failed to update password. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      {notification && (
        <div className={`mb-4 p-2 rounded ${notification.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {notification}
        </div>
      )}
      <form onSubmit={handleAddUser} className="mb-8">
        <div className="flex items-center space-x-4">
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder="Email"
            className="flex-grow p-2 border rounded"
            required
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="team">Team</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="bg-green-500 text-white p-2 rounded flex items-center">
            <UserPlus className="mr-2" /> Add User
          </button>
        </div>
      </form>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => setSelectedUser(user)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                  <Key className="h-5 w-5" />
                </button>
                <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                  <Edit className="h-5 w-5" />
                </button>
                <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900">
                  <Trash2 className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Change Password for {selectedUser.email}</h3>
              <form onSubmit={handlePasswordChange} className="mt-2 text-left">
                <div className="mb-4">
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={passwordChangeData.currentPassword}
                    onChange={(e) => setPasswordChangeData({ ...passwordChangeData, currentPassword: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={passwordChangeData.newPassword}
                    onChange={(e) => setPasswordChangeData({ ...passwordChangeData, newPassword: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={passwordChangeData.confirmPassword}
                    onChange={(e) => setPasswordChangeData({ ...passwordChangeData, confirmPassword: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={() => setSelectedUser(null)} className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;