import React from 'react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Transaction, useTransactions } from '../../hooks/useTransactions'
import { Trash2, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react'
import { format } from 'date-fns'

interface TransactionListProps {
  transactions: Transaction[]
}

export function TransactionList({ transactions }: TransactionListProps) {
  const { deleteTransaction } = useTransactions()

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'income':
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'investment':
        return <PiggyBank className="w-4 h-4 text-blue-600" />
      default:
        return <TrendingDown className="w-4 h-4 text-red-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'income':
        return 'text-green-600'
      case 'investment':
        return 'text-blue-600'
      default:
        return 'text-red-600'
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      await deleteTransaction(id)
    }
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-gray-500">No transactions yet. Add your first transaction to get started!</p>
        </div>
      </Card>
    )
  }

  return (
    <Card padding={false}>
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {transactions.slice(0, 10).map((transaction) => (
          <div key={transaction.id} className="p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {getTypeIcon(transaction.type)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {transaction.description}
                </p>
                <p className="text-sm text-gray-500 capitalize">
                  {transaction.category} • {format(new Date(transaction.date), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`text-lg font-semibold ${getTypeColor(transaction.type)}`}>
                {transaction.type === 'expense' || transaction.type === 'investment' ? '-' : '+'}
                ${transaction.amount.toLocaleString()}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(transaction.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}