# Changelog

All notable changes to the Shug's Cakes Website project.

## [Unreleased] - 2026-01-07

### Security Fixes (CRITICAL)

#### Removed Hardcoded Admin Credentials
- **FIXED**: Removed hardcoded admin username/password from `AuthContext.jsx`
- **FIXED**: Removed hardcoded admin UUID from source code
- **FIXED**: Removed localStorage-based admin session (XSS vulnerable)
- **CHANGED**: Admin authentication now uses Supabase Auth with email/password
- **CHANGED**: Admin status checked via environment variable `VITE_ADMIN_EMAILS`
- **ADDED**: Proper session management with Supabase tokens

#### Removed Exposed Sensitive Data
- **FIXED**: Removed hardcoded admin email `steve.c.shaffer@gmail.com` from `adminCheck.js`
- **CHANGED**: Admin emails now configured in `.env` file
- **DELETED**: Removed `src/lib/adminCheck.js` (no longer needed)

### Added

#### Form Validation with Zod
- **ADDED**: `src/lib/validations/schemas.js` with comprehensive validation schemas
- **ADDED**: Zod validation for contact form
- **ADDED**: Zod validation for login/signup forms
- **ADDED**: Zod validation for order form (schema created, ready for integration)
- **ADDED**: Zod validation for promotion codes

#### Toast Notifications
- **ADDED**: Sonner toast notification library
- **ADDED**: `src/components/Toaster.jsx` component
- **CHANGED**: Replaced all `alert()` calls with toast notifications
- **CHANGED**: Replaced `confirm()` dialogs with `window.confirm()` (to be enhanced with modal dialogs later)
- **IMPROVED**: Better user feedback for all form submissions and errors

#### API Service Layer
- **ADDED**: `src/api/` directory for organized API calls
- **ADDED**: `src/api/orders.js` - Order management API
- **ADDED**: `src/api/promotions.js` - Promotion validation and management
- **ADDED**: `src/api/contact.js` - Contact form submission
- **ADDED**: `src/api/index.js` - Centralized API exports
- **IMPROVED**: Consistent error handling across all API calls
- **IMPROVED**: Type-safe API responses with proper error messages

#### Constants and Helpers
- **ADDED**: `src/constants/index.js` - Centralized constants file
- **ADDED**: Order type constants and labels
- **ADDED**: Cake type constants and labels
- **ADDED**: Gallery category constants
- **ADDED**: Order status constants
- **ADDED**: Business information constants
- **ADDED**: Helper functions for label generation
- **IMPROVED**: Eliminated magic strings throughout the codebase

#### Contact Form Integration
- **FIXED**: Contact form now properly saves to database
- **ADDED**: Form validation with Zod
- **ADDED**: Error display for form fields
- **ADDED**: Loading states during submission
- **CHANGED**: Using BUSINESS_INFO constants for contact details
- **IMPROVED**: Better error handling and user feedback

#### Login/Signup Improvements
- **ADDED**: Zod validation for login form
- **ADDED**: Zod validation for signup form
- **ADDED**: Toast notifications for success/error states
- **ADDED**: Field-level error display
- **IMPROVED**: Better password validation feedback
- **IMPROVED**: Confirm password matching with visual feedback

### Changed

#### Admin Authentication Flow
- **CHANGED**: Admin login now uses email/password instead of username/password
- **CHANGED**: Admin session managed by Supabase instead of localStorage
- **CHANGED**: `AdminLogin.jsx` updated to match customer login pattern
- **CHANGED**: `AuthContext.jsx` completely refactored for security

#### Code Organization
- **DELETED**: Removed duplicate admin pages in `src/pages/admin/`
- **KEPT**: Using admin pages in `src/pages/` (AdminLogin, AdminDashboard, AdminOrderDetail)
- **IMPROVED**: Cleaner project structure without duplication

#### User Experience
- **IMPROVED**: All forms now show loading states
- **IMPROVED**: Toast notifications provide better feedback
- **IMPROVED**: Error messages are more user-friendly
- **IMPROVED**: Form validation provides real-time feedback

### Documentation

- **ADDED**: `ADMIN_SETUP.md` - Guide for setting up admin users
- **ADDED**: `CHANGELOG.md` - This file
- **UPDATED**: README.md should be updated with new admin setup instructions

### Dependencies

#### Added
- `zod` - Form validation
- `sonner` - Toast notifications
- `react-hook-form` - Form state management (installed for future use)
- `@hookform/resolvers` - Zod integration with React Hook Form

### Breaking Changes

#### Admin Login
- **BREAKING**: Old hardcoded admin credentials (`admin`/`admin`) no longer work
- **MIGRATION**: Admins must create Supabase user accounts
- **MIGRATION**: Admin emails must be added to `.env` file in `VITE_ADMIN_EMAILS`
- **SEE**: `ADMIN_SETUP.md` for migration guide

### Files Changed

#### Security Fixes
- `src/contexts/AuthContext.jsx` - Complete refactor
- `src/pages/AdminLogin.jsx` - Updated for email/password auth
- `src/lib/adminCheck.js` - DELETED
- `.env` - Added `VITE_ADMIN_EMAILS` configuration

#### New Files
- `src/constants/index.js`
- `src/api/orders.js`
- `src/api/promotions.js`
- `src/api/contact.js`
- `src/api/index.js`
- `src/lib/validations/schemas.js`
- `src/components/Toaster.jsx`
- `ADMIN_SETUP.md`
- `CHANGELOG.md`

#### Updated Files
- `src/App.jsx` - Added Toaster component
- `src/pages/Contact.jsx` - Added validation, database integration, toast
- `src/pages/Login.jsx` - Added validation and toast
- `src/pages/Signup.jsx` - Added validation and toast
- `src/pages/Account.jsx` - Replaced alerts with toast
- `src/pages/AdminDashboard.jsx` - Replaced alerts with toast
- `src/pages/AdminOrderDetail.jsx` - Replaced alerts with toast
- `src/components/OrderForm.jsx` - Replaced alerts with toast
- `package.json` - Added new dependencies

#### Deleted Files
- `src/pages/admin/AdminDashboard.jsx` - Duplicate
- `src/pages/admin/AdminLogin.jsx` - Duplicate
- `src/pages/admin/OrdersManagement.jsx` - Duplicate
- `src/pages/admin/CustomersManagement.jsx` - Duplicate
- `src/pages/admin/GalleryManagement.jsx` - Duplicate
- `src/pages/admin/PromotionsManagement.jsx` - Duplicate
- `src/lib/adminCheck.js` - Security risk

### Known Issues

#### To Be Implemented
- [ ] Promotion code validation in OrderForm
- [ ] Server-side authorization with RLS policies
- [ ] Email notification system
- [ ] Testing infrastructure with Vitest
- [ ] CAPTCHA on public forms
- [ ] Gallery image upload functionality
- [ ] Review system
- [ ] GDPR compliance features

#### Future Improvements
- [ ] Replace `window.confirm()` with custom modal dialogs
- [ ] Add React Hook Form to complex forms
- [ ] Implement comprehensive test coverage
- [ ] Add pre-commit hooks for linting
- [ ] Implement proper CORS configuration
- [ ] Add Content Security Policy headers
- [ ] Implement rate limiting
- [ ] Add HTTPS enforcement
- [ ] Move admin emails from .env to database table

## Summary

This release focuses primarily on **critical security fixes** and **code quality improvements**. The most important change is the removal of hardcoded admin credentials and the implementation of proper Supabase authentication. Additionally, form validation, toast notifications, and better code organization significantly improve the development experience and user experience.

**Status**: Ready for development, requires admin user setup before deployment
**Priority**: High - Security fixes included
**Risk Level**: Medium - Breaking changes for admin authentication
