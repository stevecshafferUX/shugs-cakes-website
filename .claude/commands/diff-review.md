Review the code changes in this repository before they are committed or pushed. The goal is to catch errors and inconsistencies against the established codebase patterns before they land.

If $ARGUMENTS is provided, treat it as a git ref to diff against (e.g. `main`, a branch name, or a commit SHA). Otherwise default to reviewing all staged + unstaged changes (`git diff HEAD`).

## Step 1 — Get the diff
Run:
```
git diff $ARGUMENTS 2>/dev/null || git diff HEAD
```
If nothing comes back, try `git diff --cached` (staged only). If there are still no changes, report "No changes to review" and stop.

Also get the list of changed files:
```
git diff --name-only $ARGUMENTS 2>/dev/null || git diff --name-only HEAD
```

## Step 2 — ESLint on changed files only
Run ESLint scoped to the changed `.js`/`.jsx` files. Build the file list from Step 1 and run:
```
npx eslint <changed-files>
```
Report any errors or warnings.

## Step 3 — New code vs API layer pattern
For any new or modified file in `src/pages/` or `src/components/`, check:
- No direct `supabase` import (use `src/api/` instead)
- Async data fetching uses try/catch with meaningful error messages surfaced to the user (e.g. via `toast` from `sonner`)

For any new or modified file in `src/api/`:
- Error pattern must be `throw new Error(\`<action>: \${error.message}\`)` — not bare `throw error`
- Every query must call `.select()` after `.insert()` or `.update()` when the caller needs the returned row
- No raw SQL strings — use the Supabase query builder

## Step 4 — New form fields vs Zod schema
If the diff adds or removes fields from a form component (look for new `register(...)`, `Controller`, or `<input name=...>` calls), verify that the corresponding Zod schema in `src/lib/validations/schemas.js` has a matching field. Cross-reference by reading the relevant schema. Flag any mismatch.

## Step 5 — Constants usage
If the diff adds new conditional logic or comparisons involving order status, order type, cake type, or gallery category values, check that it uses constants from `src/constants/index.js` rather than raw string literals.

## Step 6 — New routes
If `src/App.jsx` is in the changed file list, check:
- Any new admin route is properly gated (uses auth guard pattern consistent with existing admin routes)
- New routes follow the existing nested layout structure

## Step 7 — Obvious logic/security issues
Scan the diff for:
- `console.log` statements left in (warn, don't block)
- Secrets or API keys hardcoded (flag as critical)
- `dangerouslySetInnerHTML` without sanitisation
- Missing `key` props in `.map()` calls
- Any `TODO` or `FIXME` comments introduced

## Summary
Produce a verdict: **Ready to commit** / **Fix before committing** / **Fix before merging**. List all findings with file:line references, severity (Critical / Important / Suggestion), and a one-line fix recommendation for each.
