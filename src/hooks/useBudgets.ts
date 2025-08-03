import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

export type Budget = {
  id: string
  user_id: string
  category: string
  monthly_limit: number
  created_at: string
}

export function useBudgets() {
  const { user } = useAuth()
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchBudgets()
    }
  }, [user])

  const fetchBudgets = async () => {
    if (!user) return

    setLoading(true)
    const { data, error } = await supabase
      .from('budgets')
      .select('*')
      .eq('user_id', user.id)

    if (error) {
      console.error('Error fetching budgets:', error)
    } else {
      setBudgets(data || [])
    }
    setLoading(false)
  }

  const addBudget = async (budget: Omit<Budget, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return

    const { data, error } = await supabase
      .from('budgets')
      .insert([{ ...budget, user_id: user.id }])
      .select()

    if (error) {
      console.error('Error adding budget:', error)
      return { error }
    } else {
      setBudgets(prev => [...prev, data[0]])
      return { data: data[0] }
    }
  }

  const updateBudget = async (id: string, updates: Partial<Budget>) => {
    const { data, error } = await supabase
      .from('budgets')
      .update(updates)
      .eq('id', id)
      .select()

    if (error) {
      console.error('Error updating budget:', error)
      return { error }
    } else {
      setBudgets(prev => prev.map(b => b.id === id ? data[0] : b))
      return { data: data[0] }
    }
  }

  return {
    budgets,
    loading,
    addBudget,
    updateBudget,
    refetch: fetchBudgets,
  }
}