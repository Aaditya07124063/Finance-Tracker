
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { AuthForm } from './components/auth/AuthForm'
import { Dashboard } from './components/Dashboard'
import { ResetPassword } from './components/auth/ResetPassword'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route 
        path="/reset-password" 
        element={<ResetPassword />} 
      />
      <Route 
        path="/dashboard" 
        element={user ? <Dashboard /> : <Navigate to="/" replace />} 
      />
      <Route 
        path="/" 
        element={user ? <Navigate to="/dashboard" replace /> : <AuthForm />} 
      />
    </Routes>
  )
}

export default App