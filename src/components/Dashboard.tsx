import { useState } from 'react'
import { useTransactions } from '../hooks/useTransactions'
import { useAuth } from '../hooks/useAuth'
import { DashboardHeader } from './dashboard/DashboardHeader'
import { StatsCards } from './dashboard/StatsCards'
import { TransactionForm } from './dashboard/TransactionForm'
import { TransactionList } from './dashboard/TransactionList'
import { SpendingChart } from './dashboard/SpendingChart'
import { MonthlyTrends } from './dashboard/MonthlyTrends'
import { BudgetForecast } from './dashboard/BudgetForecast'
import { QuickSummary } from './dashboard/QuickSummary'
import { BudgetGoals } from './dashboard/BudgetGoals'
import { Notifications } from './dashboard/Notifications'
import { FinancialTips } from './dashboard/FinancialTips'
import { seedPracticeData } from '../utils/seedData'
import { Button } from './ui/Button'

export function Dashboard() {
  const { transactions, loading, error, refetch } = useTransactions()
  const { user } = useAuth()
  const [seedingData, setSeedingData] = useState(false)
  const [seedMessage, setSeedMessage] = useState('')

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Loading your financial data...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Database Setup Required</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                  <p className="mt-2">
                    Please run the SQL migrations in your Supabase project to create the required tables.
                    You can find the migration files in the <code className="bg-red-100 px-1 rounded">supabase/migrations</code> folder.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Financial Dashboard</h2>
            <p className="text-gray-600">Track your income, expenses, and investments</p>
          </div>
          <div className="flex items-center space-x-4">
            {transactions.length === 0 && (
              <Button
                onClick={async () => {
                  if (!user) return
                  setSeedingData(true)
                  setSeedMessage('')
                  const result = await seedPracticeData(user.id)
                  if (result.error) {
                    setSeedMessage('Error seeding data. Please try again.')
                  } else {
                    setSeedMessage('Practice data added successfully!')
                    refetch()
                  }
                  setSeedingData(false)
                }}
                disabled={seedingData}
                variant="outline"
              >
                {seedingData ? 'Adding Practice Data...' : 'Add Practice Data'}
              </Button>
            )}
            <TransactionForm />
          </div>
        </div>

        {seedMessage && (
          <div className={`mb-6 p-4 rounded-lg ${
            seedMessage.includes('Error') 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {seedMessage}
          </div>
        )}

        <div className="space-y-8">
          <StatsCards transactions={transactions} />
          
          <QuickSummary transactions={transactions} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SpendingChart transactions={transactions} />
            <BudgetGoals transactions={transactions} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BudgetForecast transactions={transactions} />
            <Notifications transactions={transactions} />
          </div>
          
          <MonthlyTrends transactions={transactions} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TransactionList transactions={transactions} />
            <FinancialTips />
          </div>
        </div>
      </main>
    </div>
  )
}