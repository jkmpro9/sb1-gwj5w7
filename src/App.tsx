import React, { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Customers from './components/Customers'
import CreateInvoice from './components/CreateInvoice'
import InvoiceList from './components/InvoiceList'
import Settings from './components/Settings'
import LoginForm from './components/LoginForm'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [activePath, setActivePath] = useState('/')

  const handleLogin = (email: string, password: string, rememberMe: boolean, role: string) => {
    // Implement actual login logic here
    setIsLoggedIn(true)
    setUserRole(role)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole(null)
  }

  const renderContent = () => {
    switch (activePath) {
      case '/':
        return <Dashboard />;
      case '/customers':
      case '/customers/add':
      case '/customers/list':
        return <Customers />;
      case '/invoices/create':
        return <CreateInvoice />;
      case '/invoices/list':
        return <InvoiceList />;
      case '/settings':
      case '/settings/users':
      case '/settings/roles':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} onRegister={() => {}} />
  }

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-gray-100">
        <Sidebar activePath={activePath} onNavigate={setActivePath} userRole={userRole} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header userRole={userRole} onLogout={handleLogout} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            {renderContent()}
          </main>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default App