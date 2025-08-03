import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Card } from '../ui/Card'
import { Lock, CheckCircle, AlertCircle } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export function ResetPassword() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isValidToken, setIsValidToken] = useState(false)

  useEffect(() => {
    // Debug: Log all URL parameters
    console.log('Reset Password URL params:', Object.fromEntries(searchParams.entries()))
    
    // Check for error parameters first
    const errorParam = searchParams.get('error')
    const errorCode = searchParams.get('error_code')
    const errorDescription = searchParams.get('error_description')

    if (errorParam) {
      console.log('Error detected:', { errorParam, errorCode, errorDescription })
      // Handle specific error cases
      switch (errorCode) {
        case 'otp_expired':
          setError('The password reset link has expired. Please request a new one.')
          break
        case 'access_denied':
          setError('Access denied. The reset link may be invalid or already used.')
          break
        default:
          setError(errorDescription || 'An error occurred with the reset link. Please try again.')
      }
      return
    }

    // Check if we have the necessary parameters for password reset
    const accessToken = searchParams.get('access_token')
    const refreshToken = searchParams.get('refresh_token')
    const type = searchParams.get('type')

    if (accessToken && refreshToken && type === 'recovery') {
      // Set the session with the tokens
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      }).then(({ data, error }) => {
        if (error) {
          console.error('Session error:', error)
          setError('Invalid or expired reset link. Please request a new one.')
        } else {
          console.log('Reset link validated successfully')
          setIsValidToken(true)
        }
      }).catch((err) => {
        console.error('Session setup error:', err)
        setError('Failed to validate reset link. Please request a new one.')
      })
    } else {
      setError('Invalid reset link. Please check your email for the correct link.')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          navigate('/dashboard')
        }, 3000)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Password Updated!</h1>
            <p className="text-gray-600 mb-4">
              Your password has been successfully updated. You will be redirected to the dashboard shortly.
            </p>
            <Button
              onClick={() => navigate('/dashboard')}
              className="w-full"
            >
              Go to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  if (!isValidToken && !error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Verifying reset link...</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-4">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Reset Your Password</h1>
          <p className="text-gray-600 mt-2">
            Enter your new password below
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
              <div className="flex-1">
                <span className="text-red-700 text-sm">{error}</span>
                <div className="mt-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/')}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Request New Reset Link
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your new password"
            minLength={6}
          />
          
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm your new password"
            minLength={6}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !isValidToken}
          >
            {loading ? 'Updating Password...' : 'Update Password'}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => navigate('/')}
          >
            Back to Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Password must be at least 6 characters long
          </p>
        </div>
      </Card>
    </div>
  )
} 