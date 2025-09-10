-- Database Functions for Brix Home Management Platform
-- This file contains useful functions for common operations

-- Function to get dashboard statistics for a user
CREATE OR REPLACE FUNCTION get_dashboard_stats(user_uuid UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_expenses', COALESCE(expense_stats.total, 0),
        'monthly_expenses', COALESCE(expense_stats.monthly, 0),
        'property_value', COALESCE(property_stats.total_value, 0),
        'equity', COALESCE(property_stats.total_equity, 0),
        'maintenance_tasks_due', COALESCE(maintenance_stats.due_count, 0),
        'budget_utilization', COALESCE(budget_stats.utilization, 0)
    ) INTO result
    FROM (
        SELECT 
            SUM(amount) as total,
            SUM(CASE WHEN date >= DATE_TRUNC('month', CURRENT_DATE) THEN amount ELSE 0 END) as monthly
        FROM public.expenses 
        WHERE user_id = user_uuid
    ) expense_stats
    CROSS JOIN (
        SELECT 
            SUM(current_market_value) as total_value,
            SUM(COALESCE(current_market_value, 0) - COALESCE(mortgage_balance, 0)) as total_equity
        FROM public.properties 
        WHERE user_id = user_uuid
    ) property_stats
    CROSS JOIN (
        SELECT COUNT(*) as due_count
        FROM public.maintenance_tasks 
        WHERE user_id = user_uuid 
        AND status IN ('pending', 'overdue')
        AND due_date <= CURRENT_DATE + INTERVAL '7 days'
    ) maintenance_stats
    CROSS JOIN (
        SELECT 
            CASE 
                WHEN SUM(monthly_limit) > 0 THEN 
                    (SUM(current_spent) / SUM(monthly_limit)) * 100
                ELSE 0 
            END as utilization
        FROM public.budgets 
        WHERE user_id = user_uuid 
        AND period_start <= CURRENT_DATE 
        AND period_end >= CURRENT_DATE
    ) budget_stats;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get expense summary by category for a property
CREATE OR REPLACE FUNCTION get_expense_summary_by_category(property_uuid UUID, start_date DATE, end_date DATE)
RETURNS TABLE (
    category expense_category,
    total_amount DECIMAL(10,2),
    transaction_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        e.category,
        SUM(e.amount) as total_amount,
        COUNT(*) as transaction_count
    FROM public.expenses e
    WHERE e.property_id = property_uuid
    AND e.date BETWEEN start_date AND end_date
    GROUP BY e.category
    ORDER BY total_amount DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get maintenance tasks due soon
CREATE OR REPLACE FUNCTION get_maintenance_tasks_due(user_uuid UUID, days_ahead INTEGER DEFAULT 30)
RETURNS TABLE (
    id UUID,
    title TEXT,
    due_date DATE,
    priority maintenance_priority,
    category maintenance_category,
    property_address TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        mt.id,
        mt.title,
        mt.due_date,
        mt.priority,
        mt.category,
        p.address as property_address
    FROM public.maintenance_tasks mt
    JOIN public.properties p ON mt.property_id = p.id
    WHERE mt.user_id = user_uuid
    AND mt.status IN ('pending', 'overdue')
    AND mt.due_date <= CURRENT_DATE + (days_ahead || ' days')::INTERVAL
    ORDER BY mt.due_date ASC, mt.priority DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update budget current_spent when expenses are added
CREATE OR REPLACE FUNCTION update_budget_spent()
RETURNS TRIGGER AS $$
BEGIN
    -- Update budget for the expense category and property
    UPDATE public.budgets 
    SET current_spent = (
        SELECT COALESCE(SUM(amount), 0)
        FROM public.expenses 
        WHERE property_id = NEW.property_id 
        AND category = NEW.category
        AND date >= period_start 
        AND date <= period_end
    )
    WHERE property_id = NEW.property_id 
    AND category = NEW.category
    AND period_start <= NEW.date 
    AND period_end >= NEW.date;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update budget when expenses are added/updated/deleted
CREATE TRIGGER trigger_update_budget_spent
    AFTER INSERT OR UPDATE OR DELETE ON public.expenses
    FOR EACH ROW EXECUTE FUNCTION update_budget_spent();

-- Function to create a new property with initial budget categories
CREATE OR REPLACE FUNCTION create_property_with_budgets(
    p_user_id UUID,
    p_address TEXT,
    p_city TEXT,
    p_state TEXT,
    p_zip_code TEXT,
    p_property_type property_type,
    p_purchase_price DECIMAL(12,2),
    p_purchase_date DATE,
    p_mortgage_balance DECIMAL(12,2) DEFAULT NULL,
    p_mortgage_rate DECIMAL(5,4) DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    new_property_id UUID;
    budget_category expense_category;
    budget_categories expense_category[] := ARRAY[
        'utilities'::expense_category,
        'maintenance'::expense_category,
        'repairs'::expense_category,
        'improvements'::expense_category,
        'insurance'::expense_category,
        'taxes'::expense_category,
        'hoa'::expense_category
    ];
BEGIN
    -- Insert the property
    INSERT INTO public.properties (
        user_id, address, city, state, zip_code, property_type,
        purchase_price, purchase_date, mortgage_balance, mortgage_rate
    ) VALUES (
        p_user_id, p_address, p_city, p_state, p_zip_code, p_property_type,
        p_purchase_price, p_purchase_date, p_mortgage_balance, p_mortgage_rate
    ) RETURNING id INTO new_property_id;
    
    -- Create default budgets for common categories
    FOREACH budget_category IN ARRAY budget_categories
    LOOP
        INSERT INTO public.budgets (
            property_id, user_id, category, monthly_limit, 
            period_start, period_end
        ) VALUES (
            new_property_id, p_user_id, budget_category, 0,
            DATE_TRUNC('month', CURRENT_DATE),
            DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month' - INTERVAL '1 day'
        );
    END LOOP;
    
    RETURN new_property_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get property value history (placeholder for future market data integration)
CREATE OR REPLACE FUNCTION get_property_value_history(property_uuid UUID)
RETURNS TABLE (
    date DATE,
    market_value DECIMAL(12,2),
    equity DECIMAL(12,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.purchase_date as date,
        p.purchase_price as market_value,
        (p.purchase_price - COALESCE(p.mortgage_balance, 0)) as equity
    FROM public.properties p
    WHERE p.id = property_uuid
    
    UNION ALL
    
    SELECT 
        CURRENT_DATE as date,
        COALESCE(p.current_market_value, p.purchase_price) as market_value,
        (COALESCE(p.current_market_value, p.purchase_price) - COALESCE(p.mortgage_balance, 0)) as equity
    FROM public.properties p
    WHERE p.id = property_uuid
    AND p.current_market_value IS NOT NULL
    
    ORDER BY date;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
