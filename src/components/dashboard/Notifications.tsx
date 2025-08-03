import React from 'react'
import { Card } from '../ui/Card'
import { Bell, AlertTriangle, Info, CheckCircle } from 'lucide-react'
import { Transaction } from '../../hooks/useTransactions'
import { startOfMonth, endOfMonth } from 'date-fns'

interface NotificationsProps {
  transactions: Transaction[]
}

export function Notifications({ transactions }: NotificationsProps) {
  const currentMonth = new Date()
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  
  const monthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date)
    return transactionDate >= monthStart && transactionDate <= monthEnd
  })
  
  const totalIncome = monthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const totalExpenses = monthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const totalInvestments = monthTransactions
    .filter(t => t.type === 'investment')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const netIncome = totalIncome - totalExpenses - totalInvestments
  const savingsRate = totalIncome > 0 ? ((netIncome / totalIncome) * 100) : 0

  // Generate notifications based on financial data
  const notifications = []

  if (transactions.length === 0) {
    notifications.push({
      type: 'info' as const,
      title: 'Welcome to Finance Tracker!',
      message: 'Start by adding your first transaction to see your financial insights.',
      icon: Info
    })
  } else if (netIncome < 0) {
    notifications.push({
      type: 'warning' as const,
      title: 'Budget Alert',
      message: 'Your expenses exceed your income this month. Consider reviewing your spending habits.',
      icon: AlertTriangle
    })
  } else if (savingsRate < 10) {
    notifications.push({
      type: 'warning' as const,
      title: 'Low Savings Rate',
      message: `Your savings rate is ${savingsRate.toFixed(1)}%. Consider increasing your savings to build wealth.`,
      icon: AlertTriangle
    })
  } else if (savingsRate >= 20) {
    notifications.push({
      type: 'success' as const,
      title: 'Great Job!',
      message: `Excellent savings rate of ${savingsRate.toFixed(1)}%. Keep up the good work!`,
      icon: CheckCircle
    })
  }

  if (totalInvestments === 0 && totalIncome > 0) {
    notifications.push({
      type: 'info' as const,
      title: 'Investment Opportunity',
      message: 'Consider setting aside some money for investments to grow your wealth over time.',
      icon: Info
    })
  }

  if (monthTransactions.length > 0) {
    const recentTransactions = monthTransactions.slice(0, 3)
    const totalRecent = recentTransactions.reduce((sum, t) => sum + t.amount, 0)
    
    if (totalRecent > totalIncome * 0.3) {
      notifications.push({
        type: 'warning' as const,
        title: 'High Recent Spending',
        message: 'Your recent transactions are significant. Review if all expenses are necessary.',
        icon: AlertTriangle
      })
    }
  }

  if (notifications.length === 0) {
    notifications.push({
      type: 'success' as const,
      title: 'All Good!',
      message: 'Your finances are looking healthy. Keep up the good work!',
      icon: CheckCircle
    })
  }

  const getNotificationStyles = (type: 'info' | 'warning' | 'success') => {
    switch (type) {
      case 'warning':
        return {
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          textColor: 'text-orange-800',
          iconColor: 'text-orange-600'
        }
      case 'success':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          iconColor: 'text-green-600'
        }
      default:
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          iconColor: 'text-blue-600'
        }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Bell className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
      </div>
      
      <div className="space-y-3">
        {notifications.map((notification, index) => {
          const styles = getNotificationStyles(notification.type)
          
          return (
            <Card key={index} className={`p-4 border ${styles.bgColor} ${styles.borderColor}`}>
              <div className="flex items-start space-x-3">
                <notification.icon className={`w-5 h-5 mt-0.5 ${styles.iconColor}`} />
                <div className="flex-1">
                  <h4 className={`font-medium ${styles.textColor}`}>
                    {notification.title}
                  </h4>
                  <p className={`text-sm mt-1 ${styles.textColor}`}>
                    {notification.message}
                  </p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
} 