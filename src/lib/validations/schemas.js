import { z } from 'zod';

// Contact form validation schema
export const contactSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(250, 'Email must be less than 250 characters'),
  phone: z.string()
    .max(50, 'Phone must be less than 50 characters')
    .optional()
    .or(z.literal('')),
  subject: z.string()
    .min(1, 'Subject is required')
    .max(200, 'Subject must be less than 200 characters'),
  message: z.string()
    .max(500, 'Message must be less than 500 characters')
    .optional()
    .or(z.literal(''))
});

// Order form validation schema
export const orderSchema = z.object({
  contactName: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  contactEmail: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(250, 'Email must be less than 250 characters'),
  contactPhone: z.string()
    .min(1, 'Phone number is required')
    .max(50, 'Phone must be less than 50 characters'),
  orderType: z.string()
    .min(1, 'Please select an order type'),
  cakeType: z.string()
    .min(1, 'Please select a cake type'),
  servings: z.number()
    .min(1, 'Number of servings must be at least 1')
    .max(500, 'Number of servings cannot exceed 500'),
  deliveryDate: z.string()
    .min(1, 'Delivery date is required'),
  specialRequests: z.string()
    .max(1000, 'Special requests must be less than 1000 characters')
    .optional()
    .or(z.literal('')),
  promoCode: z.string()
    .max(50, 'Promo code must be less than 50 characters')
    .optional()
    .or(z.literal(''))
});

// Auth schemas
export const signUpSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters'),
  fullName: z.string()
    .min(1, 'Full name is required')
    .max(100, 'Full name must be less than 100 characters')
});

export const signInSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string()
    .min(1, 'Password is required')
});

// Promotion schema
export const promotionSchema = z.object({
  code: z.string()
    .min(1, 'Code is required')
    .max(50, 'Code must be less than 50 characters')
    .transform(val => val.toUpperCase()),
  description: z.string()
    .min(1, 'Description is required')
    .max(200, 'Description must be less than 200 characters'),
  discount_type: z.enum(['percentage', 'fixed_amount']),
  discount_value: z.number()
    .min(0, 'Discount value must be positive')
    .max(100, 'Percentage discount cannot exceed 100%'),
  valid_until: z.string().nullable().optional(),
  max_uses: z.number()
    .min(0, 'Max uses must be positive')
    .nullable()
    .optional(),
  is_active: z.boolean().default(true)
});

// Promo code validation
export const promoCodeSchema = z.string()
  .min(1, 'Please enter a promo code')
  .max(50, 'Promo code must be less than 50 characters');
