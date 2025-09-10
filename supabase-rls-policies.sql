-- Row Level Security (RLS) Policies for Brix Home Management Platform
-- This file contains all RLS policies to ensure users can only access their own data

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insurance_policies ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Properties table policies
CREATE POLICY "Users can view own properties" ON public.properties
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own properties" ON public.properties
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own properties" ON public.properties
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own properties" ON public.properties
    FOR DELETE USING (auth.uid() = user_id);

-- Expenses table policies
CREATE POLICY "Users can view own expenses" ON public.expenses
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own expenses" ON public.expenses
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own expenses" ON public.expenses
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own expenses" ON public.expenses
    FOR DELETE USING (auth.uid() = user_id);

-- Maintenance tasks table policies
CREATE POLICY "Users can view own maintenance tasks" ON public.maintenance_tasks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own maintenance tasks" ON public.maintenance_tasks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own maintenance tasks" ON public.maintenance_tasks
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own maintenance tasks" ON public.maintenance_tasks
    FOR DELETE USING (auth.uid() = user_id);

-- Contractors table policies (public read, admin write)
CREATE POLICY "Anyone can view contractors" ON public.contractors
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert contractors" ON public.contractors
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update contractors" ON public.contractors
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Budgets table policies
CREATE POLICY "Users can view own budgets" ON public.budgets
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own budgets" ON public.budgets
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own budgets" ON public.budgets
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own budgets" ON public.budgets
    FOR DELETE USING (auth.uid() = user_id);

-- Documents table policies
CREATE POLICY "Users can view own documents" ON public.documents
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents" ON public.documents
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents" ON public.documents
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents" ON public.documents
    FOR DELETE USING (auth.uid() = user_id);

-- Home inventory table policies
CREATE POLICY "Users can view own inventory" ON public.home_inventory
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own inventory" ON public.home_inventory
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own inventory" ON public.home_inventory
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own inventory" ON public.home_inventory
    FOR DELETE USING (auth.uid() = user_id);

-- Insurance policies table policies
CREATE POLICY "Users can view own insurance policies" ON public.insurance_policies
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own insurance policies" ON public.insurance_policies
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own insurance policies" ON public.insurance_policies
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own insurance policies" ON public.insurance_policies
    FOR DELETE USING (auth.uid() = user_id);
