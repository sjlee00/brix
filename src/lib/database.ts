import { supabase } from './supabase'
import { 
  User,
  Property, 
  Expense, 
  MaintenanceTask, 
  Budget, 
  DashboardStats,
  CreatePropertyData,
  CreateExpenseData,
  CreateMaintenanceTaskData,
  ExpenseSummary,
  MaintenanceTaskDue
} from '@/types'

// Property operations
export const propertyService = {
  async create(data: CreatePropertyData, userId: string): Promise<Property | null> {
    const { data: result, error } = await supabase
      .from('properties')
      .insert({
        ...data,
        user_id: userId
      })
      .select()
      .single()

    if (error) throw error
    return result
  },

  async getByUser(userId: string): Promise<Property[]> {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async getById(id: string): Promise<Property | null> {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<Property>): Promise<Property | null> {
    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Expense operations
export const expenseService = {
  async create(data: CreateExpenseData, userId: string): Promise<Expense | null> {
    const { data: result, error } = await supabase
      .from('expenses')
      .insert({
        ...data,
        user_id: userId
      })
      .select()
      .single()

    if (error) throw error
    return result
  },

  async getByProperty(propertyId: string): Promise<Expense[]> {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('property_id', propertyId)
      .order('date', { ascending: false })

    if (error) throw error
    return data || []
  },

  async getByUser(userId: string): Promise<Expense[]> {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })

    if (error) throw error
    return data || []
  },

  async getSummaryByCategory(propertyId: string, startDate: string, endDate: string): Promise<ExpenseSummary[]> {
    const { data, error } = await supabase
      .rpc('get_expense_summary_by_category', {
        property_uuid: propertyId,
        start_date: startDate,
        end_date: endDate
      })

    if (error) throw error
    return data || []
  },

  async update(id: string, updates: Partial<Expense>): Promise<Expense | null> {
    const { data, error } = await supabase
      .from('expenses')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Maintenance task operations
export const maintenanceService = {
  async create(data: CreateMaintenanceTaskData, userId: string): Promise<MaintenanceTask | null> {
    const { data: result, error } = await supabase
      .from('maintenance_tasks')
      .insert({
        ...data,
        user_id: userId
      })
      .select()
      .single()

    if (error) throw error
    return result
  },

  async getByProperty(propertyId: string): Promise<MaintenanceTask[]> {
    const { data, error } = await supabase
      .from('maintenance_tasks')
      .select('*')
      .eq('property_id', propertyId)
      .order('due_date', { ascending: true })

    if (error) throw error
    return data || []
  },

  async getByUser(userId: string): Promise<MaintenanceTask[]> {
    const { data, error } = await supabase
      .from('maintenance_tasks')
      .select('*')
      .eq('user_id', userId)
      .order('due_date', { ascending: true })

    if (error) throw error
    return data || []
  },

  async getTasksDue(userId: string, daysAhead: number = 30): Promise<MaintenanceTaskDue[]> {
    const { data, error } = await supabase
      .rpc('get_maintenance_tasks_due', {
        user_uuid: userId,
        days_ahead: daysAhead
      })

    if (error) throw error
    return data || []
  },

  async update(id: string, updates: Partial<MaintenanceTask>): Promise<MaintenanceTask | null> {
    const { data, error } = await supabase
      .from('maintenance_tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('maintenance_tasks')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Budget operations
export const budgetService = {
  async getByProperty(propertyId: string): Promise<Budget[]> {
    const { data, error } = await supabase
      .from('budgets')
      .select('*')
      .eq('property_id', propertyId)
      .order('category')

    if (error) throw error
    return data || []
  },

  async update(id: string, updates: Partial<Budget>): Promise<Budget | null> {
    const { data, error } = await supabase
      .from('budgets')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }
}

// Dashboard operations
export const dashboardService = {
  async getStats(userId: string): Promise<DashboardStats | null> {
    const { data, error } = await supabase
      .rpc('get_dashboard_stats', {
        user_uuid: userId
      })

    if (error) throw error
    return data
  }
}

// User operations
export const userService = {
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  },

  async updateProfile(userId: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  }
}
