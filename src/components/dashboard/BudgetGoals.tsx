import React, { useState } from 'react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Target, Plus, CheckCircle, XCircle } from 'lucide-react'
import { Transaction } from '../../hooks/useTransactions'
import { startOfMonth, endOfMonth } from 'date-fns'

interface BudgetGoal {
  id: string
  category: string
  targetAmount: number
  currentAmount: number
  period: 'monthly' | 'yearly'
  description: string
}

interface BudgetGoalsProps {
  transactions: Transaction[]
}

export function BudgetGoals({ transactions }: BudgetGoalsProps) {
  const [goals, setGoals] = useState<BudgetGoal[]>([
    {
      id: '1',
      category: 'Food & Dining',
      targetAmount: 400,
      currentAmount: 0,
      period: 'monthly',
      description: 'Keep dining expenses under control'
    },
    {
      id: '2',
      category: 'Entertainment',
      targetAmount: 200,
      currentAmount: 0,
      period: 'monthly',
      description: 'Limit entertainment spending'
    }
  ])
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [newGoal, setNewGoal] = useState({
    category: '',
    targetAmount: '',
    period: 'monthly' as const,
    description: ''
  })

  const currentMonth = new Date()
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  
  const monthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date)
    return transactionDate >= monthStart && transactionDate <= monthEnd
  })

  // Calculate current amounts for each goal
  const updatedGoals = goals.map(goal => {
    const currentAmount = monthTransactions
      .filter(t => t.type === 'expense' && t.category === goal.category)
      .reduce((sum, t) => sum + t.amount, 0)
    
    return { ...goal, currentAmount }
  })

  const handleAddGoal = () => {
    if (!newGoal.category || !newGoal.targetAmount || !newGoal.description) return

    const goal: BudgetGoal = {
      id: Date.now().toString(),
      category: newGoal.category,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: 0,
      period: newGoal.period,
      description: newGoal.description
    }

    setGoals([...goals, goal])
    setNewGoal({ category: '', targetAmount: '', period: 'monthly', description: '' })
    setShowAddGoal(false)
  }

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id))
  }

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100
    if (percentage >= 90) return 'text-red-600'
    if (percentage >= 75) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getProgressBgColor = (current: number, target: number) => {
    const percentage = (current / target) * 100
    if (percentage >= 90) return 'bg-red-100'
    if (percentage >= 75) return 'bg-yellow-100'
    return 'bg-green-100'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Budget Goals</h3>
        <Button
          onClick={() => setShowAddGoal(true)}
          size="sm"
          variant="outline"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {updatedGoals.map((goal) => {
          const percentage = (goal.currentAmount / goal.targetAmount) * 100
          const isOverBudget = goal.currentAmount > goal.targetAmount
          
          return (
            <Card key={goal.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <h4 className="font-medium text-gray-900">{goal.category}</h4>
                    {isOverBudget ? (
                      <XCircle className="w-4 h-4 text-red-500" />
                    ) : percentage >= 100 ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : null}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">
                        ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          getProgressBgColor(goal.currentAmount, goal.targetAmount)
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">{goal.period}</span>
                      <span className={`font-medium ${getProgressColor(goal.currentAmount, goal.targetAmount)}`}>
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            </Card>
          )
        })}
      </div>

      {showAddGoal && (
        <Card className="p-4">
          <h4 className="font-medium text-gray-900 mb-4">Add New Budget Goal</h4>
          <div className="space-y-4">
            <Select
              label="Category"
              value={newGoal.category}
              onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
              options={[
                { value: '', label: 'Select category' },
                { value: 'Food & Dining', label: 'Food & Dining' },
                { value: 'Transportation', label: 'Transportation' },
                { value: 'Shopping', label: 'Shopping' },
                { value: 'Entertainment', label: 'Entertainment' },
                { value: 'Bills & Utilities', label: 'Bills & Utilities' },
                { value: 'Healthcare', label: 'Healthcare' },
                { value: 'Education', label: 'Education' },
                { value: 'Travel', label: 'Travel' },
                { value: 'Other', label: 'Other' },
              ]}
            />
            
            <Input
              label="Target Amount"
              type="number"
              step="0.01"
              value={newGoal.targetAmount}
              onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
              placeholder="0.00"
            />
            
            <Select
              label="Period"
              value={newGoal.period}
              onChange={(e) => setNewGoal({ ...newGoal, period: e.target.value as 'monthly' | 'yearly' })}
              options={[
                { value: 'monthly', label: 'Monthly' },
                { value: 'yearly', label: 'Yearly' },
              ]}
            />
            
            <Input
              label="Description"
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              placeholder="Describe your goal"
            />
            
            <div className="flex space-x-3 pt-2">
              <Button onClick={handleAddGoal} className="flex-1">
                Add Goal
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddGoal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
} 