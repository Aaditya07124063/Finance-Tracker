import React from 'react'
import { Card } from '../ui/Card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Transaction } from '../../hooks/useTransactions'
import { getMonthlyData } from '../../utils/budgetForecasting'

interface MonthlyTrendsProps {
  transactions: Transaction[]
}

export function MonthlyTrends({ transactions }: MonthlyTrendsProps) {
  const monthlyData = getMonthlyData(transactions, 6)

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, '']} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="income" 
              stroke="#10B981" 
              strokeWidth={2}
              name="Income"
            />
            <Line 
              type="monotone" 
              dataKey="expenses" 
              stroke="#EF4444" 
              strokeWidth={2}
              name="Expenses"
            />
            <Line 
              type="monotone" 
              dataKey="investments" 
              stroke="#3B82F6" 
              strokeWidth={2}
              name="Investments"
            />
            <Line 
              type="monotone" 
              dataKey="net" 
              stroke="#8B5CF6" 
              strokeWidth={2}
              name="Net Income"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}