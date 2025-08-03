import React from 'react'
import { Card } from '../ui/Card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Transaction } from '../../hooks/useTransactions'
import { getCategorySpending } from '../../utils/budgetForecasting'

interface SpendingChartProps {
  transactions: Transaction[]
}

const COLORS = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6B7280'
]

export function SpendingChart({ transactions }: SpendingChartProps) {
  const categoryData = getCategorySpending(transactions)

  if (categoryData.length === 0) {
    return (
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending by Category</h3>
        <div className="text-center py-8">
          <p className="text-gray-500">No expense data for this month</p>
        </div>
      </Card>
    )
  }

  const chartData = categoryData.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length]
  }))

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending by Category</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ category, percentage }) => `${category} (${percentage.toFixed(1)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="amount"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Amount']} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}