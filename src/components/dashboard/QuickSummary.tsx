import React from 'react'
import { Card } from '../ui/Card'
import { TrendingUp, TrendingDown, Target, AlertTriangle } from 'lucide-react'
import { Transaction } from '../../hooks/useTransactions'
import { startOfMonth, endOfMonth, format } from 'date-fns'

interface QuickSummaryProps {
  transactions: Transaction[]
}

export function QuickSummary({ transactions }: QuickSummaryProps) {
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

  // Get top expense categories
  const expenseCategories = monthTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {} as Record<string, number>)

  const topExpenseCategory = Object.entries(expenseCategories)
    .sort(([,a], [,b]) => b - a)[0]

  const insights = [
    {
      title: 'Monthly Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      icon: Target,
      color: savingsRate >= 20 ? 'text-green-600' : savingsRate >= 10 ? 'text-yellow-600' : 'text-red-600',
      bgColor: savingsRate >= 20 ? 'bg-green-50' : savingsRate >= 10 ? 'bg-yellow-50' : 'bg-red-50',
      description: savingsRate >= 20 ? 'Great job saving!' : savingsRate >= 10 ? 'Good progress' : 'Consider reducing expenses'
    },
    {
      title: 'Biggest Expense',
      value: topExpenseCategory ? `$${topExpenseCategory[1].toLocaleString()}` : 'No expenses',
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: topExpenseCategory ? `${topExpenseCategory[0]}` : 'Add some transactions'
    },
    {
      title: 'Investment Rate',
      value: totalIncome > 0 ? `${((totalInvestments / totalIncome) * 100).toFixed(1)}%` : '0%',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Of income invested'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Quick Insights</h3>
        <span className="text-sm text-gray-500">
          {format(currentMonth, 'MMMM yyyy')}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight) => (
          <Card key={insight.title} className="p-4">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${insight.bgColor}`}>
                <insight.icon className={`w-5 h-5 ${insight.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{insight.title}</p>
                <p className="text-xl font-bold text-gray-900">{insight.value}</p>
                <p className="text-xs text-gray-500 mt-1">{insight.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {netIncome < 0 && (
        <Card className="p-4 border-orange-200 bg-orange-50">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <div>
              <p className="text-sm font-medium text-orange-800">Budget Alert</p>
              <p className="text-xs text-orange-700">
                Your expenses exceed your income this month. Consider reviewing your spending habits.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
} 