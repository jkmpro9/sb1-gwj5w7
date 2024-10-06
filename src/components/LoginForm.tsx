import React, { useState } from 'react'
import { FileText, BarChart2, Users, FileSpreadsheet, Settings } from 'lucide-react'

interface LoginFormProps {
  onLogin: (email: string, password: string, rememberMe: boolean, role: string) => void
  onRegister: (email: string, password: string, role: string) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onRegister }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      if (isRegistering) {
        await onRegister(email, password, isAdmin ? 'admin' : 'team')
        setError('Registration successful! You can now log in.')
        setIsRegistering(false)
      } else {
        await onLogin(email, password, rememberMe, isAdmin ? 'admin' : 'team')
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || (isRegistering ? 'Registration failed' : 'Invalid email or password'))
      } else {
        setError(isRegistering ? 'Registration failed' : 'Invalid email or password')
      }
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-1/2 bg-white p-12 flex flex-col justify-between">
        <div>
          <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center mb-8">
            <FileText className="text-white" size={24} />
          </div>
          <h2 className="text-3xl font-bold mb-2">Get Started</h2>
          <p className="text-gray-600 mb-8">Welcome to CoBill - Let's create your account</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                placeholder="hi@cobill.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-green-600 hover:text-green-500">
                Forgot?
              </a>
            </div>
            <div className="flex items-center">
              <input
                id="admin-checkbox"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="admin-checkbox" className="ml-2 block text-sm text-gray-900">
                Login as Admin
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 text-white p-2 rounded-md hover:bg-green-800 transition duration-200"
            >
              {isRegistering ? 'Sign up' : 'Sign in'}
            </button>
          </form>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              className="ml-1 text-green-600 hover:text-green-500"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? 'Log in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
      <div className="w-1/2 bg-green-700 p-12 flex items-center justify-center">
        <div className="text-white max-w-md">
          <h1 className="text-5xl font-bold mb-4">CoBill</h1>
          <h2 className="text-4xl font-light mb-8">Internal Tool for your business</h2>
          <div className="bg-white bg-opacity-10 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-10 rounded-md p-4 flex flex-col items-center justify-center">
                <BarChart2 className="w-12 h-12 mb-2" />
                <p className="text-sm font-semibold">Analytics</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-md p-4 flex flex-col items-center justify-center">
                <Users className="w-12 h-12 mb-2" />
                <p className="text-sm font-semibold">User Management</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-md p-4 flex flex-col items-center justify-center">
                <FileSpreadsheet className="w-12 h-12 mb-2" />
                <p className="text-sm font-semibold">Invoicing</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-md p-4 flex flex-col items-center justify-center">
                <Settings className="w-12 h-12 mb-2" />
                <p className="text-sm font-semibold">Settings</p>
              </div>
            </div>
          </div>
          <button className="bg-white text-green-700 px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-200">
            Explore Features
          </button>
        </div>
      </div>
      {error && (
        <div className="absolute bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
          <p>{error}</p>
        </div>
      )}
    </div>
  )
}

export default LoginForm