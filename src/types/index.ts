// User and Authentication Types
export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

// Property Types
export interface Property {
  id: string
  user_id: string
  address: string
  city: string
  state: string
  zip_code: string
  property_type: 'single_family' | 'condo' | 'townhouse' | 'multi_family'
  purchase_price: number
  purchase_date: string
  current_market_value?: number
  mortgage_balance?: number
  created_at: string
  updated_at: string
}

// Expense Types
export interface Expense {
  id: string
  property_id: string
  user_id: string
  amount: number
  category: ExpenseCategory
  description: string
  date: string
  receipt_url?: string
  is_recurring: boolean
  recurring_frequency?: 'monthly' | 'quarterly' | 'yearly'
  created_at: string
  updated_at: string
}

export type ExpenseCategory = 
  | 'utilities'
  | 'maintenance'
  | 'repairs'
  | 'improvements'
  | 'insurance'
  | 'taxes'
  | 'hoa'
  | 'other'

// Maintenance Types
export interface MaintenanceTask {
  id: string
  property_id: string
  user_id: string
  title: string
  description?: string
  due_date: string
  completed_date?: string
  status: 'pending' | 'in_progress' | 'completed' | 'overdue'
  priority: 'low' | 'medium' | 'high'
  category: MaintenanceCategory
  contractor_id?: string
  cost?: number
  created_at: string
  updated_at: string
}

export type MaintenanceCategory = 
  | 'hvac'
  | 'plumbing'
  | 'electrical'
  | 'roofing'
  | 'landscaping'
  | 'appliances'
  | 'security'
  | 'other'

// Budget Types
export interface Budget {
  id: string
  property_id: string
  user_id: string
  category: ExpenseCategory
  monthly_limit: number
  current_spent: number
  period_start: string
  period_end: string
  created_at: string
  updated_at: string
}

// Dashboard Types
export interface DashboardStats {
  total_expenses: number
  monthly_expenses: number
  property_value: number
  equity: number
  maintenance_tasks_due: number
  budget_utilization: number
}
