import React, { useState } from 'react';
import { Home, Users, FileText, BarChart2, Truck, Package, Settings, Shield, ChevronDown, ChevronUp, UserPlus, List, PlusCircle } from 'lucide-react';

interface MenuItem {
  text: string;
  path: string;
  icon: React.ElementType;
  subItems?: MenuItem[];
}

interface SidebarProps {
  activePath: string;
  onNavigate: (path: string) => void;
  userRole: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ activePath, onNavigate, userRole }) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    { text: 'Dashboard', path: '/', icon: Home },
    {
      text: 'Customers',
      path: '/customers',
      icon: Users,
      subItems: [
        { text: 'Add Customer', path: '/customers/add', icon: UserPlus },
        { text: 'Customer List', path: '/customers/list', icon: List },
      ],
    },
    {
      text: 'Invoices',
      path: '/invoices',
      icon: FileText,
      subItems: [
        { text: 'Create Invoice', path: '/invoices/create', icon: PlusCircle },
        { text: 'Invoice List', path: '/invoices/list', icon: List },
      ],
    },
    { text: 'Analytics', path: '/analytics', icon: BarChart2 },
    { text: 'Shipping', path: '/shipping', icon: Truck },
    { text: 'Inventory', path: '/inventory', icon: Package },
  ];

  const generalItems: MenuItem[] = [
    {
      text: 'Settings',
      path: '/settings',
      icon: Settings,
      subItems: [
        { text: 'User Management', path: '/settings/users', icon: Users },
        { text: 'Role Management', path: '/settings/roles', icon: Shield },
      ],
    },
  ];

  const toggleExpand = (path: string) => {
    setExpandedItem(expandedItem === path ? null : path);
  };

  const renderMenuItem = (item: MenuItem, index: number) => {
    const isActive = activePath.startsWith(item.path);
    const isExpanded = expandedItem === item.path;

    if (item.text === 'Settings' && userRole !== 'admin') {
      return null;
    }

    return (
      <div key={index}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (item.subItems) {
              toggleExpand(item.path);
            } else {
              onNavigate(item.path);
            }
          }}
          className={`flex items-center justify-between py-2 px-4 text-gray-300 hover:bg-green-800 rounded ${
            isActive ? 'bg-green-800' : ''
          }`}
        >
          <div className="flex items-center">
            <item.icon className="mr-3 h-5 w-5" />
            <span className="font-medium">{item.text}</span>
          </div>
          {item.subItems && (
            isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
          )}
        </a>
        {item.subItems && isExpanded && (
          <div className="ml-6 mt-2 space-y-2">
            {item.subItems.map((subItem, subIndex) => (
              <a
                key={subIndex}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(subItem.path);
                }}
                className={`flex items-center py-2 px-4 text-gray-300 hover:bg-green-800 rounded ${
                  activePath === subItem.path ? 'bg-green-800' : ''
                }`}
              >
                <subItem.icon className="mr-3 h-4 w-4" />
                <span className="font-medium">{subItem.text}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-green-900 text-white w-64 min-h-screen p-4">
      <div className="flex items-center mb-8">
        <span className="text-2xl font-bold">COCCINELLE SARL</span>
      </div>
      <nav>
        <p className="text-gray-400 mb-2 text-sm font-medium">MENU</p>
        {menuItems.map(renderMenuItem)}
        <p className="text-gray-400 mt-8 mb-2 text-sm font-medium">GENERAL</p>
        {generalItems.map(renderMenuItem)}
      </nav>
    </div>
  );
};

export default Sidebar;