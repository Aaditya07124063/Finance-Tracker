import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      transactions: {
        Row: {
          id: string
          user_id: string
          type: 'income' | 'expense' | 'investment'
          category: string
          amount: number
          description: string
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'income' | 'expense' | 'investment'
          category: string
          amount: number
          description: string
          date: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'income' | 'expense' | 'investment'
          category?: string
          amount?: number
          description?: string
          date?: string
          created_at?: string
        }
      }
      budgets: {
        Row: {
          id: string
          user_id: string
          category: string
          monthly_limit: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category: string
          monthly_limit: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category?: string
          monthly_limit?: number
          created_at?: string
        }
      }
    }
  }
}