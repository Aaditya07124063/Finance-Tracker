import React from 'react'
import { Card } from '../ui/Card'
import { TrendingUp, TrendingDown, PiggyBank, Target } from 'lucide-react'
import { Transaction } from '../../hooks/useTransactions'
import { startOfMonth, endOfMonth } from 'date-fns'

interface StatsCardsProps {
  transactions: Transaction[]
}

export function StatsCards({ transactions }: StatsCardsProps) {
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

  const stats = [
    {
      title: 'Monthly Income',
      value: `$${totalIncome.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Monthly Expenses',
      value: `$${totalExpenses.toLocaleString()}`,
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Investments',
      value: `$${totalInvestments.toLocaleString()}`,
      icon: PiggyBank,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Net Income',
      value: `$${netIncome.toLocaleString()}`,
      icon: Target,
      color: netIncome >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: netIncome >= 0 ? 'bg-green-50' : 'bg-red-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}