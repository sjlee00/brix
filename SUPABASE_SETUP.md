# Supabase Database Setup Guide

This guide will help you set up the Supabase database for your Brix home management platform.

## 🚀 Quick Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `brix-home-management`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"

### 2. Get Your Project Credentials

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public** key
   - **service_role** key (keep this secret!)

### 3. Update Environment Variables

Update your `.env.local` file with the credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 4. Set Up Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Run the following SQL files in order:

   **Step 1: Create Schema**
   ```sql
   -- Copy and paste the contents of supabase-schema.sql
   ```

   **Step 2: Set Up Security**
   ```sql
   -- Copy and paste the contents of supabase-rls-policies.sql
   ```

   **Step 3: Add Functions**
   ```sql
   -- Copy and paste the contents of supabase-functions.sql
   ```

### 5. Verify Setup

1. Go to **Table Editor** to verify all tables were created
2. Check that RLS is enabled on all tables
3. Test authentication by running your app

## 📊 Database Schema Overview

### Core Tables

- **`users`** - User profiles and authentication data
- **`properties`** - Property information and details
- **`expenses`** - Home-related expenses and receipts
- **`maintenance_tasks`** - Maintenance scheduling and tracking
- **`contractors`** - Service provider information
- **`budgets`** - Budget management and limits

### Additional Tables

- **`documents`** - Home-related document storage
- **`home_inventory`** - Personal property inventory
- **`insurance_policies`** - Insurance policy tracking

### Key Features

- **Row Level Security (RLS)** - Users can only access their own data
- **Automatic Timestamps** - `created_at` and `updated_at` fields
- **Data Validation** - Enums for categories and statuses
- **Performance Indexes** - Optimized for common queries
- **Helper Functions** - Dashboard stats, expense summaries, etc.

## 🔧 Database Functions

### Dashboard Statistics
```sql
SELECT get_dashboard_stats('user-uuid-here');
```

### Expense Summary by Category
```sql
SELECT * FROM get_expense_summary_by_category(
    'property-uuid-here',
    '2024-01-01'::DATE,
    '2024-12-31'::DATE
);
```

### Maintenance Tasks Due Soon
```sql
SELECT * FROM get_maintenance_tasks_due('user-uuid-here', 30);
```

### Create Property with Default Budgets
```sql
SELECT create_property_with_budgets(
    'user-uuid-here',
    '123 Main St',
    'San Francisco',
    'CA',
    '94102',
    'single_family',
    800000.00,
    '2024-01-15'::DATE,
    600000.00,
    0.0375
);
```

## 🔒 Security Features

### Row Level Security (RLS)
- All tables have RLS enabled
- Users can only access their own data
- Contractors table is publicly readable
- All policies are user-scoped

### Data Protection
- Foreign key constraints ensure data integrity
- Automatic timestamp updates
- Input validation through enums
- Secure function execution

## 📈 Performance Optimizations

### Indexes
- User ID indexes for fast user data queries
- Property ID indexes for property-specific data
- Date indexes for time-based queries
- Category indexes for filtering

### Query Optimization
- Dashboard stats function for fast overview
- Categorized expense summaries
- Maintenance task filtering
- Budget utilization tracking

## 🧪 Testing the Setup

### 1. Test Authentication
```bash
npm run dev
# Navigate to /auth/signup
# Create a test account
```

### 2. Test Database Connection
```bash
# Check browser console for any Supabase connection errors
# Verify user data is being stored
```

### 3. Test RLS Policies
```bash
# Try accessing data from different user accounts
# Verify users can only see their own data
```

## 🚨 Troubleshooting

### Common Issues

**"Invalid API key" error**
- Check your environment variables
- Ensure you're using the correct project URL and keys

**"Row Level Security" errors**
- Verify RLS policies are applied
- Check that user is authenticated

**"Function does not exist" error**
- Ensure all SQL files were run in order
- Check function names and parameters

**"Permission denied" error**
- Verify RLS policies are correct
- Check user authentication status

### Getting Help

1. Check Supabase logs in the dashboard
2. Review the SQL error messages
3. Verify your environment variables
4. Test with a simple query first

## 🔄 Next Steps

After setting up the database:

1. **Test the authentication flow**
2. **Create a test property**
3. **Add some sample expenses**
4. **Test the dashboard functions**
5. **Verify data security**

Your Brix home management platform is now ready for development! 🎉
