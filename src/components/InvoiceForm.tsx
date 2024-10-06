import React, { useState } from 'react'
import { Save } from 'lucide-react'

interface InvoiceFormProps {
  // Add props as needed
}

const InvoiceForm: React.FC<InvoiceFormProps> = () => {
  const [customerName, setCustomerName] = useState('')
  const [items, setItems] = useState([{ description: '', quantity: 0, price: 0 }])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted', { customerName, items })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
          Customer Name
        </label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      {/* Add more form fields for invoice details */}
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Save className="w-5 h-5 mr-2" />
        Save Invoice
      </button>
    </form>
  )
}

export default InvoiceForm