import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

export type Transaction = {
  id: string
  user_id: string
  type: 'income' | 'expense' | 'investment'
  category: string
  amount: number
  description: string
  date: string
  created_at: string
}

export function useTransactions() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      fetchTransactions()
    }
  }, [user])

  const fetchTransactions = async () => {
    if (!user) return

    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })

    if (error) {
      if (error.code === '42P01') {
        setError('Database tables not found. Please set up your Supabase database first.')
      } else {
        setError('Error fetching transactions: ' + error.message)
      }
      console.error('Error fetching transactions:', error)
    } else {
      setTransactions(data || [])
    }
    setLoading(false)
  }

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return

    const { data, error } = await supabase
      .from('transactions')
      .insert([{ ...transaction, user_id: user.id }])
      .select()

    if (error) {
      console.error('Error adding transaction:', error)
      return { error }
    } else {
      setTransactions(prev => [data[0], ...prev])
      return { data: data[0] }
    }
  }

  const deleteTransaction = async (id: string) => {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting transaction:', error)
      return { error }
    } else {
      setTransactions(prev => prev.filter(t => t.id !== id))
      return { success: true }
    }
  }

  return {
    transactions,
    loading,
    error,
    addTransaction,
    deleteTransaction,
    refetch: fetchTransactions,
  }
}