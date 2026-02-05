# Database Migration: Add Onboarding Tracking

This migration adds the `onboarding_completed` column to the `users` table to track which users have completed the onboarding flow.

## SQL Command

Run this SQL in your Supabase SQL Editor:

```sql
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;
```

## How to Apply

### Option 1: Via Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Paste the SQL command above
5. Click "Run" to execute

### Option 2: Via Supabase MCP (If configured)
If you have Supabase MCP configured, you can run the migration programmatically.

## What This Does

- Adds a new column `onboarding_completed` to the `users` table
- Defaults to `FALSE` for existing users
- New users will also default to `FALSE`
- When users complete onboarding, this will be set to `TRUE`

## Verification

To verify the column was added successfully:

```sql
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'users'
  AND column_name = 'onboarding_completed';
```

You should see:
```
column_name           | data_type | column_default
----------------------|-----------|----------------
onboarding_completed  | boolean   | false
```

## Rollback (If Needed)

If you need to remove this column:

```sql
ALTER TABLE public.users DROP COLUMN IF EXISTS onboarding_completed;
```
