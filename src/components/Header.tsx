import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut } from 'lucide-react';

interface HeaderProps {
  userRole: string | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    onLogout();
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-sm p-4 flex justify-end">
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center space-x-2 focus:outline-none"
          onClick={toggleDropdown}
        >
          <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white">
            <User className="w-6 h-6" />
          </div>
          <span className="text-gray-700 font-medium">{userRole}</span>
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <LogOut className="w-4 h-4 inline-block mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;