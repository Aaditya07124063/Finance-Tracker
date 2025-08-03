import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Card } from '../ui/Card'
import { DollarSign, Mail } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  
  const { signIn, signUp, resetPassword } = useAuth()

  // Check for error parameters in URL (when redirected from reset password)
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const errorParam = urlParams.get('error')
    const errorCode = urlParams.get('error_code')
    
    if (errorParam) {
      switch (errorCode) {
        case 'otp_expired':
          setError('Password reset link expired. Please request a new one.')
          break
        case 'access_denied':
          setError('Reset link invalid or already used. Please request a new one.')
          break
        default:
          setError('Password reset failed. Please try again.')
      }
      // Clear the URL parameters
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccessMessage('')

    try {
      const { error } = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password)

      if (error) {
        setError(error.message)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError('Please enter your email address')
      return
    }

    setLoading(true)
    setError('')
    setSuccessMessage('')

    try {
      const { error } = await resetPassword(email)

      if (error) {
        setError(error.message)
      } else {
        setSuccessMessage('Password reset email sent! Check your inbox.')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-4">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">FinanceTracker</h1>
          <p className="text-gray-600 mt-2">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </p>
        </div>

        {showForgotPassword ? (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="text-center mb-4">
              <Mail className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h2 className="text-xl font-semibold text-gray-900">Reset Password</h2>
              <p className="text-gray-600 text-sm">Enter your email to receive a reset link</p>
            </div>
            
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                {successMessage}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setShowForgotPassword(false)}
            >
              Back to Sign In
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
            
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
            </Button>
          </form>
        )}

        {!showForgotPassword && (
          <div className="mt-6 text-center space-y-2">
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-blue-600 hover:text-blue-700 block"
            >
              Forgot your password?
            </button>
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-blue-600 hover:text-blue-700 block"
            >
              {isSignUp 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"
              }
            </button>
          </div>
        )}
      </Card>
    </div>
  )
}