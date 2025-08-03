import React, { useState } from 'react'
import { useTransactions } from '../../hooks/useTransactions'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Modal } from '../ui/Modal'
import { Plus } from 'lucide-react'

const EXPENSE_CATEGORIES = [
  { value: 'food', label: 'Food & Dining' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'bills', label: 'Bills & Utilities' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'travel', label: 'Travel' },
  { value: 'other', label: 'Other' },
]

const INCOME_CATEGORIES = [
  { value: 'salary', label: 'Salary' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'business', label: 'Business' },
  { value: 'investment', label: 'Investment Returns' },
  { value: 'other', label: 'Other' },
]

const INVESTMENT_CATEGORIES = [
  { value: 'stocks', label: 'Stocks' },
  { value: 'bonds', label: 'Bonds' },
  { value: 'crypto', label: 'Cryptocurrency' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'retirement', label: 'Retirement Fund' },
  { value: 'other', label: 'Other' },
]

export function TransactionForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [type, setType] = useState<'income' | 'expense' | 'investment'>('expense')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)
  
  const { addTransaction } = useTransactions()

  const getCategoryOptions = () => {
    switch (type) {
      case 'income':
        return INCOME_CATEGORIES
      case 'investment':
        return INVESTMENT_CATEGORIES
      default:
        return EXPENSE_CATEGORIES
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await addTransaction({
        type,
        category,
        amount: parseFloat(amount),
        description,
        date,
      })
      
      // Reset form
      setType('expense')
      setCategory('')
      setAmount('')
      setDescription('')
      setDate(new Date().toISOString().split('T')[0])
      setIsOpen(false)
    } catch (error) {
      console.error('Error adding transaction:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="w-4 h-4 mr-2" />
        Add Transaction
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add Transaction">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Type"
            value={type}
            onChange={(e) => {
              setType(e.target.value as 'income' | 'expense' | 'investment')
              setCategory('')
            }}
            options={[
              { value: 'expense', label: 'Expense' },
              { value: 'income', label: 'Income' },
              { value: 'investment', label: 'Investment' },
            ]}
          />

          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { value: '', label: 'Select a category' },
              ...getCategoryOptions()
            ]}
            required
          />

          <Input
            label="Amount"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="0.00"
          />

          <Input
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter description"
          />

          <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <div className="flex space-x-3 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Adding...' : 'Add Transaction'}
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}