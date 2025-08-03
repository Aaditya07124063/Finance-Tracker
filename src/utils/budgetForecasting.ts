import { Transaction } from '../hooks/useTransactions'
import { startOfMonth, endOfMonth, subMonths, format } from 'date-fns'

export interface MonthlyData {
  month: string
  income: number
  expenses: number
  investments: number
  net: number
}

export interface CategorySpending {
  category: string
  amount: number
  percentage: number
}

export interface BudgetForecast {
  predictedIncome: number
  predictedExpenses: number
  predictedNet: number
  confidence: number
}

export function getMonthlyData(transactions: Transaction[], months: number = 6): MonthlyData[] {
  const monthlyData: MonthlyData[] = []
  
  for (let i = 0; i < months; i++) {
    const date = subMonths(new Date(), i)
    const monthStart = startOfMonth(date)
    const monthEnd = endOfMonth(date)
    
    const monthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date)
      return transactionDate >= monthStart && transactionDate <= monthEnd
    })
    
    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const expenses = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const investments = monthTransactions
      .filter(t => t.type === 'investment')
      .reduce((sum, t) => sum + t.amount, 0)
    
    monthlyData.unshift({
      month: format(date, 'MMM yyyy'),
      income,
      expenses,
      investments,
      net: income - expenses - investments
    })
  }
  
  return monthlyData
}

export function getCategorySpending(transactions: Transaction[]): CategorySpending[] {
  const currentMonth = new Date()
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  
  const monthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date)
    return transactionDate >= monthStart && transactionDate <= monthEnd && t.type === 'expense'
  })
  
  const categoryTotals = monthTransactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount
    return acc
  }, {} as Record<string, number>)
  
  const totalExpenses = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0)
  
  return Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0
    }))
    .sort((a, b) => b.amount - a.amount)
}

export function generateBudgetForecast(transactions: Transaction[]): BudgetForecast {
  const monthlyData = getMonthlyData(transactions, 6)
  
  if (monthlyData.length < 3) {
    return {
      predictedIncome: 0,
      predictedExpenses: 0,
      predictedNet: 0,
      confidence: 0
    }
  }
  
  // Simple linear regression for trend analysis
  const incomes = monthlyData.map(d => d.income)
  const expenses = monthlyData.map(d => d.expenses)
  
  const avgIncome = incomes.reduce((sum, val) => sum + val, 0) / incomes.length
  const avgExpenses = expenses.reduce((sum, val) => sum + val, 0) / expenses.length
  
  // Calculate trend (simple moving average with recent months weighted more)
  const recentIncomes = incomes.slice(-3)
  const recentExpenses = expenses.slice(-3)
  
  const recentAvgIncome = recentIncomes.reduce((sum, val) => sum + val, 0) / recentIncomes.length
  const recentAvgExpenses = recentExpenses.reduce((sum, val) => sum + val, 0) / recentExpenses.length
  
  // Weighted prediction (70% recent trend, 30% overall average)
  const predictedIncome = recentAvgIncome * 0.7 + avgIncome * 0.3
  const predictedExpenses = recentAvgExpenses * 0.7 + avgExpenses * 0.3
  
  // Calculate confidence based on data consistency
  const incomeVariance = incomes.reduce((sum, val) => sum + Math.pow(val - avgIncome, 2), 0) / incomes.length
  const expenseVariance = expenses.reduce((sum, val) => sum + Math.pow(val - avgExpenses, 2), 0) / expenses.length
  
  const incomeStdDev = Math.sqrt(incomeVariance)
  const expenseStdDev = Math.sqrt(expenseVariance)
  
  // Confidence decreases with higher variance
  const incomeConfidence = avgIncome > 0 ? Math.max(0, 1 - (incomeStdDev / avgIncome)) : 0
  const expenseConfidence = avgExpenses > 0 ? Math.max(0, 1 - (expenseStdDev / avgExpenses)) : 0
  const confidence = (incomeConfidence + expenseConfidence) / 2
  
  return {
    predictedIncome: Math.round(predictedIncome),
    predictedExpenses: Math.round(predictedExpenses),
    predictedNet: Math.round(predictedIncome - predictedExpenses),
    confidence: Math.round(confidence * 100)
  }
}