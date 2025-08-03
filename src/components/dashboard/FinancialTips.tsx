import React, { useState } from 'react'
import { Card } from '../ui/Card'
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react'

const financialTips = [
  {
    id: 1,
    title: '50/30/20 Rule',
    description: 'Allocate 50% of your income to needs, 30% to wants, and 20% to savings and investments.',
    category: 'Budgeting'
  },
  {
    id: 2,
    title: 'Emergency Fund',
    description: 'Build an emergency fund with 3-6 months of living expenses for financial security.',
    category: 'Savings'
  },
  {
    id: 3,
    title: 'Pay Yourself First',
    description: 'Automatically transfer a portion of your income to savings before paying other expenses.',
    category: 'Savings'
  },
  {
    id: 4,
    title: 'Track Your Spending',
    description: 'Monitor your expenses regularly to identify areas where you can cut back.',
    category: 'Budgeting'
  },
  {
    id: 5,
    title: 'Diversify Investments',
    description: 'Spread your investments across different asset classes to reduce risk.',
    category: 'Investing'
  },
  {
    id: 6,
    title: 'Compound Interest',
    description: 'Start investing early to take advantage of compound interest over time.',
    category: 'Investing'
  },
  {
    id: 7,
    title: 'Debt Management',
    description: 'Focus on paying off high-interest debt first, then tackle lower-interest debt.',
    category: 'Debt'
  },
  {
    id: 8,
    title: 'Live Below Your Means',
    description: 'Spend less than you earn to build wealth and achieve financial freedom.',
    category: 'Lifestyle'
  }
]

export function FinancialTips() {
  const [expandedTip, setExpandedTip] = useState<number | null>(null)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Budgeting':
        return 'bg-blue-100 text-blue-800'
      case 'Savings':
        return 'bg-green-100 text-green-800'
      case 'Investing':
        return 'bg-purple-100 text-purple-800'
      case 'Debt':
        return 'bg-red-100 text-red-800'
      case 'Lifestyle':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Lightbulb className="w-5 h-5 text-yellow-600" />
        <h3 className="text-lg font-semibold text-gray-900">Financial Tips</h3>
      </div>
      
      <div className="space-y-3">
        {financialTips.map((tip) => (
          <Card key={tip.id} className="p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-gray-900">{tip.title}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(tip.category)}`}>
                      {tip.category}
                    </span>
                  </div>
                  
                  {expandedTip === tip.id ? (
                    <p className="text-sm text-gray-600">{tip.description}</p>
                  ) : (
                    <p className="text-sm text-gray-600 line-clamp-2">{tip.description}</p>
                  )}
                </div>
                
                <button
                  onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
                  className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {expandedTip === tip.id ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 