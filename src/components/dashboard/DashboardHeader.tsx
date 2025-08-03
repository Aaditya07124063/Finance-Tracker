import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useTransactions } from '../../hooks/useTransactions'
import { Button } from '../ui/Button'
import { DarkModeToggle } from '../ui/DarkModeToggle'
import { ChangePassword } from '../auth/ChangePassword'
import { DollarSign, LogOut, Download, Lock } from 'lucide-react'

export function DashboardHeader() {
  const { user, signOut } = useAuth()
  const { transactions } = useTransactions()
  const [showChangePassword, setShowChangePassword] = useState(false)

  const handleSignOut = async () => {
    await signOut()
  }

  const handleExportData = () => {
    const csvContent = [
      ['Date', 'Type', 'Category', 'Amount', 'Description'],
      ...transactions.map(t => [
        t.date,
        t.type,
        t.category,
        t.amount.toString(),
        t.description
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `finance-data-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg mr-3">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">FinanceTracker</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {user?.email}
            </span>
            <DarkModeToggle />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportData}
              disabled={transactions.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowChangePassword(true)}
            >
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
      
      <ChangePassword 
        isOpen={showChangePassword} 
        onClose={() => setShowChangePassword(false)} 
      />
    </header>
  )
}