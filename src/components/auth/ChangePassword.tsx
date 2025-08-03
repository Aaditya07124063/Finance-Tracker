import React, { useState } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Card } from '../ui/Card'
import { Modal } from '../ui/Modal'
import { Lock, CheckCircle, AlertCircle } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

interface ChangePasswordProps {
  isOpen: boolean
  onClose: () => void
}

export function ChangePassword({ isOpen, onClose }: ChangePasswordProps) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const { updatePassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long')
      return
    }

    if (currentPassword === newPassword) {
      setError('New password must be different from current password')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { error } = await updatePassword(newPassword)

      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
        // Reset form
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        // Close modal after 3 seconds
        setTimeout(() => {
          setSuccess(false)
          onClose()
        }, 3000)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setError('')
      setSuccess(false)
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Card className="w-full max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-4">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
          <p className="text-gray-600 text-sm mt-1">
            Enter your new password below
          </p>
        </div>

        {success ? (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Password Updated!</h3>
            <p className="text-gray-600">
              Your password has been successfully changed.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              placeholder="Enter your current password"
            />
            
            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter your new password"
              minLength={6}
            />
            
            <Input
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your new password"
              minLength={6}
            />

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              </div>
            )}

            <div className="flex space-x-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          </form>
        )}

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Password must be at least 6 characters long
          </p>
        </div>
      </Card>
    </Modal>
  )
} 