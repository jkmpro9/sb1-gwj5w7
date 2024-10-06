import React, { useState } from 'react';
import { Download, Upload } from 'lucide-react';
import { exportData, importData } from '../services/database';

const Settings: React.FC = () => {
  const [notification, setNotification] = useState<string | null>(null);

  const handleExport = async () => {
    try {
      const data = await exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'invoice_app_data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setNotification('Data exported successfully!');
    } catch (error) {
      console.error('Error exporting data:', error);
      setNotification('Error exporting data. Please try again.');
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const jsonData = event.target?.result as string;
        await importData(jsonData);
        setNotification('Data imported successfully!');
      } catch (error) {
        console.error('Error importing data:', error);
        setNotification('Error importing data. Please try again.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      {notification && (
        <div className={`mb-4 p-2 rounded ${notification.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {notification}
        </div>
      )}
      <div className="space-y-4">
        <div>
          <button
            onClick={handleExport}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <Download className="mr-2" />
            Export Data
          </button>
        </div>
        <div>
          <label htmlFor="import-file" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center cursor-pointer">
            <Upload className="mr-2" />
            Import Data
          </label>
          <input
            type="file"
            id="import-file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;