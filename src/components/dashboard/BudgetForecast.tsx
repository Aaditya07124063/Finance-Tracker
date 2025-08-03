import React from 'react'
import { Card } from '../ui/Card'
import { Transaction } from '../../hooks/useTransactions'
import { generateBudgetForecast } from '../../utils/budgetForecasting'
import { TrendingUp, TrendingDown, Target, AlertCircle } from 'lucide-react'

interface BudgetForecastProps {
  transactions: Transaction[]
}

export function BudgetForecast({ transactions }: BudgetForecastProps) {
  const forecast = generateBudgetForecast(transactions)

  if (forecast.confidence === 0) {
    return (
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Forecast</h3>
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            Need at least 3 months of data to generate accurate forecasts
          </p>
        </div>
      </Card>
    )
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 70) return 'text-green-600 bg-green-50'
    if (confidence >= 50) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Budget Forecast</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(forecast.confidence)}`}>
          {forecast.confidence}% Confidence
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
          <div className="flex items-center">
            <TrendingUp className="w-5 h-5 text-green-600 mr-3" />
            <span className="font-medium text-green-900">Predicted Income</span>
          </div>
          <span className="text-xl font-bold text-green-600">
            ${forecast.predictedIncome.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
          <div className="flex items-center">
            <TrendingDown className="w-5 h-5 text-red-600 mr-3" />
            <span className="font-medium text-red-900">Predicted Expenses</span>
          </div>
          <span className="text-xl font-bold text-red-600">
            ${forecast.predictedExpenses.toLocaleString()}
          </span>
        </div>

        <div className={`flex items-center justify-between p-4 rounded-lg ${
          forecast.predictedNet >= 0 ? 'bg-blue-50' : 'bg-orange-50'
        }`}>
          <div className="flex items-center">
            <Target className={`w-5 h-5 mr-3 ${
              forecast.predictedNet >= 0 ? 'text-blue-600' : 'text-orange-600'
            }`} />
            <span className={`font-medium ${
              forecast.predictedNet >= 0 ? 'text-blue-900' : 'text-orange-900'
            }`}>
              Predicted Net
            </span>
          </div>
          <span className={`text-xl font-bold ${
            forecast.predictedNet >= 0 ? 'text-blue-600' : 'text-orange-600'
          }`}>
            ${forecast.predictedNet.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>How it works:</strong> Our ML algorithm analyzes your spending patterns 
          from the last 6 months to predict next month's budget. Higher confidence indicates 
          more consistent spending patterns.
        </p>
      </div>
    </Card>
  )
}