import { supabase } from '../lib/supabase'

export const seedPracticeData = async (userId: string) => {
  const practiceTransactions = [
    // Income transactions
    {
      user_id: userId,
      type: 'income' as const,
      category: 'Salary',
      amount: 5000,
      description: 'Monthly salary from TechCorp',
      date: new Date().toISOString().split('T')[0],
    },
    {
      user_id: userId,
      type: 'income' as const,
      category: 'Freelance',
      amount: 800,
      description: 'Web development project',
      date: new Date().toISOString().split('T')[0],
    },
    {
      user_id: userId,
      type: 'income' as const,
      category: 'Investment Returns',
      amount: 150,
      description: 'Dividend from stock portfolio',
      date: new Date().toISOString().split('T')[0],
    },

    // Expense transactions
    {
      user_id: userId,
      type: 'expense' as const,
      category: 'Housing',
      amount: 1200,
      description: 'Monthly rent payment',
      date: new Date().toISOString().split('T')[0],
    },
    {
      user_id: userId,
      type: 'expense' as const,
      category: 'Food & Dining',
      amount: 400,
      description: 'Grocery shopping and restaurants',
      date: new Date().toISOString().split('T')[0],
    },
    {
      user_id: userId,
      type: 'expense' as const,
      category: 'Transportation',
      amount: 200,
      description: 'Gas and public transport',
      date: new Date().toISOString().split('T')[0],
    },
    {
      user_id: userId,
      type: 'expense' as const,
      category: 'Utilities',
      amount: 150,
      description: 'Electricity, water, internet',
      date: new Date().toISOString().split('T')[0],
    },
    {
      user_id: userId,
      type: 'expense' as const,
      category: 'Entertainment',
      amount: 100,
      description: 'Movies, games, subscriptions',
      date: new Date().toISOString().split('T')[0],
    },

    // Investment transactions
    {
      user_id: userId,
      type: 'investment' as const,
      category: 'Stocks',
      amount: 500,
      description: 'Purchase of tech stocks',
      date: new Date().toISOString().split('T')[0],
    },
    {
      user_id: userId,
      type: 'investment' as const,
      category: 'Crypto',
      amount: 200,
      description: 'Bitcoin investment',
      date: new Date().toISOString().split('T')[0],
    },
    {
      user_id: userId,
      type: 'investment' as const,
      category: 'Retirement',
      amount: 300,
      description: '401k contribution',
      date: new Date().toISOString().split('T')[0],
    },

    // Previous month transactions for trends
    {
      user_id: userId,
      type: 'income' as const,
      category: 'Salary',
      amount: 5000,
      description: 'Previous month salary',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    {
      user_id: userId,
      type: 'expense' as const,
      category: 'Housing',
      amount: 1200,
      description: 'Previous month rent',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    {
      user_id: userId,
      type: 'expense' as const,
      category: 'Food & Dining',
      amount: 350,
      description: 'Previous month groceries',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
  ]

  try {
    const { data, error } = await supabase
      .from('transactions')
      .insert(practiceTransactions)
      .select()

    if (error) {
      console.error('Error seeding data:', error)
      return { error }
    }

    console.log('Practice data seeded successfully:', data?.length, 'transactions')
    return { data }
  } catch (err) {
    console.error('Error seeding practice data:', err)
    return { error: err }
  }
} 