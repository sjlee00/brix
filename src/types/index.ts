// Enums matching database schema
export type PropertyType = 'single_family' | 'condo' | 'townhouse' | 'multi_family'
export type ExpenseCategory = 'utilities' | 'maintenance' | 'repairs' | 'improvements' | 'insurance' | 'taxes' | 'hoa' | 'other'
export type MaintenanceCategory = 'hvac' | 'plumbing' | 'electrical' | 'roofing' | 'landscaping' | 'appliances' | 'security' | 'other'
export type MaintenanceStatus = 'pending' | 'in_progress' | 'completed' | 'overdue'
export type MaintenancePriority = 'low' | 'medium' | 'high'
export type RecurringFrequency = 'monthly' | 'quarterly' | 'yearly'

// User and Authentication Types
export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  phone?: string
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
  property_type: PropertyType
  purchase_price: number
  purchase_date: string
  current_market_value?: number
  mortgage_balance?: number
  mortgage_rate?: number
  property_tax_annual?: number
  hoa_fee_monthly?: number
  square_footage?: number
  bedrooms?: number
  bathrooms?: number
  year_built?: number
  lot_size?: number
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
  recurring_frequency?: RecurringFrequency
  vendor?: string
  payment_method?: string
  created_at: string
  updated_at: string
}

// Maintenance Types
export interface MaintenanceTask {
  id: string
  property_id: string
  user_id: string
  title: string
  description?: string
  due_date: string
  completed_date?: string
  status: MaintenanceStatus
  priority: MaintenancePriority
  category: MaintenanceCategory
  contractor_id?: string
  cost?: number
  notes?: string
  created_at: string
  updated_at: string
}

// Contractor Types
export interface Contractor {
  id: string
  name: string
  email?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip_code?: string
  services: string[]
  rating: number
  review_count: number
  is_verified: boolean
  created_at: string
  updated_at: string
}

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

// Document Types
export interface Document {
  id: string
  property_id: string
  user_id: string
  title: string
  description?: string
  file_url: string
  file_type: string
  file_size?: number
  category?: string
  expiry_date?: string
  created_at: string
  updated_at: string
}

// Home Inventory Types
export interface HomeInventoryItem {
  id: string
  property_id: string
  user_id: string
  item_name: string
  description?: string
  category?: string
  purchase_date?: string
  purchase_price?: number
  current_value?: number
  warranty_expiry?: string
  serial_number?: string
  location?: string
  created_at: string
  updated_at: string
}

// Insurance Policy Types
export interface InsurancePolicy {
  id: string
  property_id: string
  user_id: string
  policy_type: string
  provider: string
  policy_number: string
  coverage_amount: number
  premium_amount: number
  premium_frequency: string
  start_date: string
  end_date: string
  deductible?: number
  agent_name?: string
  agent_phone?: string
  agent_email?: string
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

// API Response Types
export interface ExpenseSummary {
  category: ExpenseCategory
  total_amount: number
  transaction_count: number
}

export interface MaintenanceTaskDue {
  id: string
  title: string
  due_date: string
  priority: MaintenancePriority
  category: MaintenanceCategory
  property_address: string
}

export interface PropertyValueHistory {
  date: string
  market_value: number
  equity: number
}

// Form Types
export interface CreatePropertyData {
  address: string
  city: string
  state: string
  zip_code: string
  property_type: PropertyType
  purchase_price: number
  purchase_date: string
  mortgage_balance?: number
  mortgage_rate?: number
}

export interface CreateExpenseData {
  property_id: string
  amount: number
  category: ExpenseCategory
  description: string
  date: string
  receipt_url?: string
  is_recurring?: boolean
  recurring_frequency?: RecurringFrequency
  vendor?: string
  payment_method?: string
}

export interface CreateMaintenanceTaskData {
  property_id: string
  title: string
  description?: string
  due_date: string
  priority: MaintenancePriority
  category: MaintenanceCategory
  contractor_id?: string
  cost?: number
  notes?: string
}
