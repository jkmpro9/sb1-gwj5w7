import React, { useState, useEffect } from 'react';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import localforage from 'localforage';

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const storedRoles = await localforage.getItem<Role[]>('roles') || [];
      setRoles(storedRoles);
    } catch (error) {
      console.error('Error fetching roles:', error);
      setNotification('Error fetching roles. Please try again.');
    }
  };

  const handleAddRole = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newRoleWithId = { ...newRole, id: Date.now().toString() };
      const updatedRoles = [...roles, newRoleWithId];
      await localforage.setItem('roles', updatedRoles);
      setRoles(updatedRoles);
      setNewRole({ name: '', permissions: [] });
      setNotification('Role added successfully!');
    } catch (error) {
      console.error('Error adding role:', error);
      setNotification('Error adding role. Please try again.');
    }
  };

  const handleDeleteRole = async (id: string) => {
    try {
      const updatedRoles = roles.filter(role => role.id !== id);
      await localforage.setItem('roles', updatedRoles);
      setRoles(updatedRoles);
      setNotification('Role deleted successfully!');
    } catch (error) {
      console.error('Error deleting role:', error);
      setNotification('Error deleting role. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-6">Role Management</h1>
      {notification && (
        <div className={`mb-4 p-2 rounded ${notification.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {notification}
        </div>
      )}
      <form onSubmit={handleAddRole} className="mb-8">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            placeholder="Role Name"
            className="flex-grow p-2 border rounded"
            required
          />
          <button type="submit" className="bg-green-500 text-white p-2 rounded flex items-center">
            <PlusCircle className="mr-2" /> Add Role
          </button>
        </div>
      </form>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {roles.map((role) => (
            <tr key={role.id}>
              <td className="px-6 py-4 whitespace-nowrap">{role.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{role.permissions.join(', ')}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                  <Edit className="h-5 w-5" />
                </button>
                <button onClick={() => handleDeleteRole(role.id)} className="text-red-600 hover:text-red-900">
                  <Trash2 className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;