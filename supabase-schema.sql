-- Brix Home Management Platform Database Schema
-- This file contains the complete database schema for the Brix application

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE property_type AS ENUM ('single_family', 'condo', 'townhouse', 'multi_family');
CREATE TYPE expense_category AS ENUM ('utilities', 'maintenance', 'repairs', 'improvements', 'insurance', 'taxes', 'hoa', 'other');
CREATE TYPE maintenance_category AS ENUM ('hvac', 'plumbing', 'electrical', 'roofing', 'landscaping', 'appliances', 'security', 'other');
CREATE TYPE maintenance_status AS ENUM ('pending', 'in_progress', 'completed', 'overdue');
CREATE TYPE maintenance_priority AS ENUM ('low', 'medium', 'high');
CREATE TYPE recurring_frequency AS ENUM ('monthly', 'quarterly', 'yearly');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Properties table
CREATE TABLE public.properties (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    property_type property_type NOT NULL,
    purchase_price DECIMAL(12,2) NOT NULL,
    purchase_date DATE NOT NULL,
    current_market_value DECIMAL(12,2),
    mortgage_balance DECIMAL(12,2),
    mortgage_rate DECIMAL(5,4),
    property_tax_annual DECIMAL(10,2),
    hoa_fee_monthly DECIMAL(8,2),
    square_footage INTEGER,
    bedrooms INTEGER,
    bathrooms DECIMAL(3,1),
    year_built INTEGER,
    lot_size DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Expenses table
CREATE TABLE public.expenses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category expense_category NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    receipt_url TEXT,
    is_recurring BOOLEAN DEFAULT FALSE,
    recurring_frequency recurring_frequency,
    vendor TEXT,
    payment_method TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Maintenance tasks table
CREATE TABLE public.maintenance_tasks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATE NOT NULL,
    completed_date DATE,
    status maintenance_status DEFAULT 'pending',
    priority maintenance_priority DEFAULT 'medium',
    category maintenance_category NOT NULL,
    contractor_id UUID,
    cost DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contractors table
CREATE TABLE public.contractors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    services TEXT[], -- Array of service types
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add contractor_id foreign key after contractors table is created
ALTER TABLE public.maintenance_tasks 
ADD CONSTRAINT fk_maintenance_tasks_contractor 
FOREIGN KEY (contractor_id) REFERENCES public.contractors(id) ON DELETE SET NULL;

-- Budgets table
CREATE TABLE public.budgets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    category expense_category NOT NULL,
    monthly_limit DECIMAL(10,2) NOT NULL,
    current_spent DECIMAL(10,2) DEFAULT 0,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(property_id, category, period_start)
);

-- Documents table for storing home-related documents
CREATE TABLE public.documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER,
    category TEXT, -- 'warranty', 'insurance', 'deed', 'inspection', etc.
    expiry_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Home inventory table
CREATE TABLE public.home_inventory (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    item_name TEXT NOT NULL,
    description TEXT,
    category TEXT, -- 'appliances', 'furniture', 'electronics', etc.
    purchase_date DATE,
    purchase_price DECIMAL(10,2),
    current_value DECIMAL(10,2),
    warranty_expiry DATE,
    serial_number TEXT,
    location TEXT, -- Room or location in the house
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insurance policies table
CREATE TABLE public.insurance_policies (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    policy_type TEXT NOT NULL, -- 'homeowners', 'flood', 'earthquake', etc.
    provider TEXT NOT NULL,
    policy_number TEXT NOT NULL,
    coverage_amount DECIMAL(12,2) NOT NULL,
    premium_amount DECIMAL(10,2) NOT NULL,
    premium_frequency TEXT NOT NULL, -- 'monthly', 'quarterly', 'annually'
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    deductible DECIMAL(10,2),
    agent_name TEXT,
    agent_phone TEXT,
    agent_email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_properties_user_id ON public.properties(user_id);
CREATE INDEX idx_expenses_property_id ON public.expenses(property_id);
CREATE INDEX idx_expenses_user_id ON public.expenses(user_id);
CREATE INDEX idx_expenses_date ON public.expenses(date);
CREATE INDEX idx_expenses_category ON public.expenses(category);
CREATE INDEX idx_maintenance_tasks_property_id ON public.maintenance_tasks(property_id);
CREATE INDEX idx_maintenance_tasks_user_id ON public.maintenance_tasks(user_id);
CREATE INDEX idx_maintenance_tasks_due_date ON public.maintenance_tasks(due_date);
CREATE INDEX idx_maintenance_tasks_status ON public.maintenance_tasks(status);
CREATE INDEX idx_budgets_property_id ON public.budgets(property_id);
CREATE INDEX idx_budgets_user_id ON public.budgets(user_id);
CREATE INDEX idx_documents_property_id ON public.documents(property_id);
CREATE INDEX idx_documents_user_id ON public.documents(user_id);
CREATE INDEX idx_home_inventory_property_id ON public.home_inventory(property_id);
CREATE INDEX idx_home_inventory_user_id ON public.home_inventory(user_id);
CREATE INDEX idx_insurance_policies_property_id ON public.insurance_policies(property_id);
CREATE INDEX idx_insurance_policies_user_id ON public.insurance_policies(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_expenses_updated_at BEFORE UPDATE ON public.expenses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_maintenance_tasks_updated_at BEFORE UPDATE ON public.maintenance_tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contractors_updated_at BEFORE UPDATE ON public.contractors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_budgets_updated_at BEFORE UPDATE ON public.budgets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON public.documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_home_inventory_updated_at BEFORE UPDATE ON public.home_inventory FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_insurance_policies_updated_at BEFORE UPDATE ON public.insurance_policies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
