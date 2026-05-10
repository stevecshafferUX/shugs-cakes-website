Cross-check that the frontend constants and Zod validation schemas stay in sync with the database migration files. This catches drift where the DB schema changes but the frontend code isn't updated (or vice versa).

## Step 1 — Gather the sources
Read these files in full:
- `src/constants/index.js` — ORDER_STATUS, ORDER_TYPES, CAKE_TYPES, GALLERY_CATEGORIES
- `src/lib/validations/schemas.js` — orderSchema, contactSchema, signUpSchema, promotionSchema
- All `.sql` files in `supabase-migrations/` and the root `database-schema.sql`

## Step 2 — ORDER_STATUS vs database
Find the `status` column definition in the SQL files (look for CHECK constraints, ENUM types, or comments listing allowed values on the `orders` table). Compare every value in `ORDER_STATUS` in `src/constants/index.js` against what the database allows. Flag:
- Frontend constant values not present in the DB constraint
- DB-allowed values missing from the frontend constants

## Step 3 — ORDER_TYPES vs database
Find how order types are stored in the DB (`order_type` column on `orders` table). Compare against `ORDER_TYPES` in constants. Flag discrepancies.

## Step 4 — orderSchema fields vs orders table columns
List every field in the `orderSchema` Zod object (`src/lib/validations/schemas.js`) and compare against the columns of the `orders` table in the migrations. Check:
- Every schema field maps to a real column (accounting for camelCase → snake_case conversion, e.g. `contactName` → `contact_name`)
- No required columns in the DB are missing from the schema (unless they have DB defaults like `id`, `created_at`, `status`)

## Step 5 — contactSchema fields vs contact_messages table
Same check for `contactSchema` vs the `contact_messages` table migration.

## Step 6 — promotionSchema fields vs promotions table
Same check for `promotionSchema` vs the `promotions` table migration.

## Step 7 — signUpSchema vs auth + user metadata
The `signUpSchema` captures `email`, `password`, and `fullName`. Verify that `fullName` is mapped to `full_name` in `user_metadata` in `src/contexts/AuthContext.jsx` `signUp()` call.

## Step 8 — GALLERY_CATEGORIES vs gallery_images table
Find how categories are stored in the `gallery_images` table. Compare against `GALLERY_CATEGORIES` constants.

## Step 9 — Migration order sanity
List the `supabase-migrations/` files by number prefix. Check:
- No gaps in the numbering sequence
- Tables referenced by foreign keys (e.g. `orders` before `order_items`) are created in an earlier-numbered migration

## Summary
For each check, state: **In sync**, **Drift found**, or **Cannot determine** (if the info isn't in the files). List all drift items with a concrete description of what needs to change and which file to change it in.
