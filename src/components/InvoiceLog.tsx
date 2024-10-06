import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// ... (keep existing interfaces)

const InvoiceLog: React.FC<InvoiceLogProps> = ({ entries }) => {
  const [expandedEntries, setExpandedEntries] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedEntries(prev =>
      prev.includes(id) ? prev.filter(entryId => entryId !== id) : [...prev, id]
    );
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Add Item':
        return 'bg-blue-500';
      case 'Update Item':
        return 'bg-yellow-500';
      case 'Delete Item':
        return 'bg-red-500';
      case 'Save Invoice':
        return 'bg-green-500';
      case 'Load Invoice':
        return 'bg-purple-500';
      case 'Generate PDF':
        return 'bg-indigo-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.id} className="border rounded-lg shadow-sm">
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleExpand(entry.id)}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${getActionColor(entry.action)}`}></div>
              <span className="font-medium">{entry.action}</span>
              <span className="text-sm text-gray-500">
                {entry.timestamp.toLocaleString()}
              </span>
            </div>
            {expandedEntries.includes(entry.id) ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </div>
          {expandedEntries.includes(entry.id) && (
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-600">{entry.details}</p>
              <p className="text-sm text-gray-500 mt-2">User: {entry.user}</p>
            </div>
          )}
        </div>
      ))}
      {entries.length > 3 && (
        <button className="text-blue-500 hover:text-blue-700 font-medium">
          Show {entries.length - 3} more activities
        </button>
      )}
    </div>
  );
};

export default InvoiceLog;