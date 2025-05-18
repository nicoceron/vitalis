# API Restructuring

This document explains how we've restructured the API folder to reduce the number of serverless functions and stay within Vercel's Hobby plan limits (12 functions).

## Problem

We were encountering this error during deployment:

```
Error: No more than 12 Serverless Functions can be added to a Deployment on the Hobby plan. Create a team (Pro plan) to deploy more. Learn More: https://vercel.link/function-count-limit
```

## Solution

We've consolidated our API files into a more organized structure with fewer total files:

### New Structure

```
api/
├── index.ts               # Main export for all API functions
├── apiClient.tsx          # Supabase client setup
└── routes/                # Organized API routes by domain
    ├── index.ts           # Exports all routes
    ├── admin.ts           # Admin and campaign functionality
    ├── auth.ts            # Authentication and user account functions
    ├── commerce.ts        # Products, subscriptions, and payments
    └── shipping.ts        # Shipping and address functions
```

### Original Structure (removed)

We had 12 separate files that were each being deployed as a serverless function:

```
api/
├── adminDashboard.tsx
├── apiClient.tsx
├── auth.tsx
├── campaign.tsx
├── createPayment.tsx
├── createShipping.tsx
├── createSubscription.tsx
├── payment.tsx
├── product.tsx
├── saveAddressInfo.tsx
├── subscription.tsx
└── user.tsx
```

## How to Update Your Imports

If you're importing directly from the individual API files, please update your imports to use the new structure:

**Before:**

```typescript
import { getAllProducts } from "@/api/product";
import { loginUser } from "@/api/auth";
```

**After:**

```typescript
// You can import directly from the top-level API
import { getAllProducts, loginUser } from "@/api";

// Or from specific route files if needed
import { getAllProducts } from "@/api/routes/commerce";
import { loginUser } from "@/api/routes/auth";
```

## Benefits

1. Reduced serverless function count to stay within Vercel limits
2. Better organization by domain/feature
3. More maintainable structure as the application grows
4. Cleaner imports with everything available from the top-level `@/api`

## Next Steps

We may need to update imports across the codebase. The functionality remains the same, only the file structure has changed.
