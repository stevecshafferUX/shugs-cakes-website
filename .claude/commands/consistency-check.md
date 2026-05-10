Audit the `src/` directory for consistency and correctness issues specific to this codebase. Work through each check below in order. Report findings grouped by check, with file paths and line numbers. If a check passes cleanly, say so briefly and move on.

## Check 1 — ESLint
Run `npm run lint` from the repo root. Report all errors and warnings. If there are none, note that.

## Check 2 — Direct Supabase imports outside the API layer
Search for `from '@/lib/supabase'` or `from '../lib/supabase'` or `import.*supabase` in files under `src/` that are NOT:
- `src/lib/supabase.js`
- `src/contexts/AuthContext.jsx`

Components and pages must go through `src/api/` (ordersApi, pricingApi, promotionsApi, contactApi). Flag any violations.

## Check 3 — Hardcoded enum strings
The project defines canonical string constants in `src/constants/index.js`: ORDER_STATUS, ORDER_TYPES, CAKE_TYPES, GALLERY_CATEGORIES. Search `src/` for places where their raw string values (e.g. `'pending'`, `'confirmed'`, `'in_progress'`, `'cupcakes'`, `'full_sheet'`, `'vanilla'`, `'birthday'`) are used directly in component logic, conditionals, or passed to the API — instead of using the exported constants. Ignore string values that appear inside `src/constants/index.js` itself and inside Zod schema definitions (those are definitions, not usages).

## Check 4 — Forms without react-hook-form + Zod
Find all `<form` elements or form-like patterns in `src/`. Each form should use `useForm` from `react-hook-form` with a `zodResolver`. Flag any forms that use `useState` for field values or `onSubmit` without a Zod schema.

## Check 5 — Error handling consistency
In `src/api/`, the pattern for errors is `throw new Error(\`...: \${error.message}\`)` (see orders.js). The `pricingApi` in `src/api/pricing.js` uses bare `throw error` instead. Flag inconsistencies across all files in `src/api/` and note which convention is used where.

## Check 6 — Protected page auth guard
Pages that are admin-only (`src/pages/Admin*.jsx`) should import and use `useAuth` from `src/contexts/AuthContext.jsx` or be wrapped by a route guard. Check that each admin page properly redirects or blocks non-admin users.

## Check 7 — Mixed styling patterns
Some pages have a companion `.css` file (e.g. `Home.jsx` + `Home.css`); others use only Tailwind classes. This is tracked inconsistency — not necessarily a bug, but flag any pages that import a `.css` file AND also mix heavy Tailwind utility usage inside the same file, which makes the styling hard to trace.

## Summary
At the end, produce a short prioritised list: **Critical** (bugs / security), **Important** (pattern violations that will cause issues), **Minor** (style inconsistencies to clean up over time).
