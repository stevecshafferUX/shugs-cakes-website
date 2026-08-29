import { describe, it, expect } from 'vitest';
import {
  contactSchema,
  orderSchema,
  signUpSchema,
  signInSchema,
  promotionSchema,
  promoCodeSchema,
} from './schemas';

describe('contactSchema', () => {
  const valid = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '555-1234',
    subject: 'Question about cakes',
    message: 'Do you make gluten-free cakes?',
  };

  it('accepts a fully valid submission', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it('accepts an empty phone/message since they are optional', () => {
    const result = contactSchema.safeParse({ ...valid, phone: '', message: '' });
    expect(result.success).toBe(true);
  });

  it('rejects a missing name', () => {
    const result = contactSchema.safeParse({ ...valid, name: '' });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid email', () => {
    const result = contactSchema.safeParse({ ...valid, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects a missing subject', () => {
    const result = contactSchema.safeParse({ ...valid, subject: '' });
    expect(result.success).toBe(false);
  });
});

describe('orderSchema', () => {
  const valid = {
    contactName: 'Jane Doe',
    contactEmail: 'jane@example.com',
    contactPhone: '555-1234',
    orderType: 'tiered',
    cakeType: 'chocolate',
    servings: 20,
    deliveryDate: '2026-12-01',
    specialRequests: '',
    promoCode: '',
  };

  it('accepts a fully valid order', () => {
    expect(orderSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects a missing contact phone', () => {
    const result = orderSchema.safeParse({ ...valid, contactPhone: '' });
    expect(result.success).toBe(false);
  });

  it('rejects zero or negative servings', () => {
    expect(orderSchema.safeParse({ ...valid, servings: 0 }).success).toBe(false);
  });

  it('rejects servings above the 500 cap', () => {
    expect(orderSchema.safeParse({ ...valid, servings: 501 }).success).toBe(false);
  });

  it('rejects a missing delivery date', () => {
    expect(orderSchema.safeParse({ ...valid, deliveryDate: '' }).success).toBe(false);
  });
});

describe('signUpSchema', () => {
  it('accepts a valid sign-up', () => {
    const result = signUpSchema.safeParse({
      email: 'jane@example.com',
      password: 'secret1',
      fullName: 'Jane Doe',
    });
    expect(result.success).toBe(true);
  });

  it('rejects a password shorter than 6 characters', () => {
    const result = signUpSchema.safeParse({
      email: 'jane@example.com',
      password: '123',
      fullName: 'Jane Doe',
    });
    expect(result.success).toBe(false);
  });
});

describe('signInSchema', () => {
  it('accepts a valid sign-in', () => {
    const result = signInSchema.safeParse({ email: 'jane@example.com', password: 'anything' });
    expect(result.success).toBe(true);
  });

  it('rejects a missing password', () => {
    const result = signInSchema.safeParse({ email: 'jane@example.com', password: '' });
    expect(result.success).toBe(false);
  });
});

describe('promotionSchema', () => {
  const valid = {
    code: 'welcome10',
    description: '10% off first order',
    discount_type: 'percentage',
    discount_value: 10,
    valid_until: null,
    max_uses: null,
    is_active: true,
  };

  it('accepts a valid promotion and uppercases the code', () => {
    const result = promotionSchema.safeParse(valid);
    expect(result.success).toBe(true);
    expect(result.data.code).toBe('WELCOME10');
  });

  it('rejects a percentage discount over 100', () => {
    const result = promotionSchema.safeParse({ ...valid, discount_value: 150 });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid discount_type', () => {
    const result = promotionSchema.safeParse({ ...valid, discount_type: 'coupon' });
    expect(result.success).toBe(false);
  });
});

describe('promoCodeSchema', () => {
  it('accepts a non-empty code', () => {
    expect(promoCodeSchema.safeParse('SAVE20').success).toBe(true);
  });

  it('rejects an empty code', () => {
    expect(promoCodeSchema.safeParse('').success).toBe(false);
  });
});
