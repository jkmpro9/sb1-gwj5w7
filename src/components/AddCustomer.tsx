import React, { useState } from 'react';
import { User, Phone, MapPin, Building } from 'lucide-react';
import localforage from 'localforage';
import { v4 as uuidv4 } from 'uuid';

interface CustomerData {
  id: string;
  nom: string;
  phone: string;
  address: string;
  ville: string;
}

const AddCustomer: React.FC = () => {
  const [customerData, setCustomerData] = useState<CustomerData>({
    id: '',
    nom: '',
    phone: '',
    address: '',
    ville: ''
  });
  const [notification, setNotification] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newCustomer = { ...customerData, id: uuidv4() };
      
      // Retrieve existing customers
      const existingCustomers = await localforage.getItem<CustomerData[]>('customers') || [];
      
      // Add new customer
      const updatedCustomers = [...existingCustomers, newCustomer];
      
      // Save updated customers list
      await localforage.setItem('customers', updatedCustomers);
      
      // Reset form and show notification
      setCustomerData({ id: '', nom: '', phone: '', address: '', ville: '' });
      setNotification('Customer added successfully!');
      
      // Clear notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error('Error saving customer:', error);
      setNotification('Error adding customer. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Customer</h1>
      {notification && (
        <div className={`mb-4 p-2 rounded ${notification.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {notification}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="nom"
              id="nom"
              className="form-input pl-10"
              placeholder="John Doe"
              value={customerData.nom}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="form-input pl-10"
              placeholder="+1 (555) 123-4567"
              value={customerData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="address"
              id="address"
              className="form-input pl-10"
              placeholder="123 Main St"
              value={customerData.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="ville" className="block text-sm font-medium text-gray-700">Ville</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="ville"
              id="ville"
              className="form-input pl-10"
              placeholder="New York"
              value={customerData.ville}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Customer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;