import { supabase } from '@/lib/supabase';

export const promotionsApi = {
  /**
   * Validate a promotion code (returns partial data for display)
   */
  async validate(code) {
    const { data, error } = await supabase
      .from('promotions')
      .select('*')
      .eq('code', code.toUpperCase())
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new Error('Promotion code not found');
      }
      throw new Error(`Failed to validate promotion: ${error.message}`);
    }

    // Check if promotion is active
    if (!data.is_active) {
      throw new Error('This promotion code is no longer active');
    }

    // Check if promotion has expired
    if (data.valid_until) {
      const expiryDate = new Date(data.valid_until);
      if (expiryDate < new Date()) {
        throw new Error('This promotion code has expired');
      }
    }

    // Check if promotion has uses left
    if (data.max_uses !== null && data.current_uses >= data.max_uses) {
      throw new Error('This promotion code has reached its usage limit');
    }

    return {
      valid: true,
      id: data.id,
      discount: data.discount_value,
      discountType: data.discount_type,
      code: data.code,
      description: data.description,
      current_uses: data.current_uses || 0
    };
  },

  /**
   * Apply a promotion code to an order
   */
  async apply(code, orderId, userId) {
    // Validate first
    const promo = await this.validate(code);

    // Record usage
    const { error } = await supabase
      .from('promo_usage')
      .insert([{
        promo_id: promo.id,
        order_id: orderId,
        user_id: userId
      }]);

    if (error) throw new Error(`Failed to apply promotion: ${error.message}`);

    // Increment usage count
    await supabase
      .from('promotions')
      .update({ current_uses: promo.current_uses + 1 })
      .eq('code', code);

    return promo;
  },

  /**
   * Get all promotions (admin only)
   */
  async getAll() {
    const { data, error } = await supabase
      .from('promotions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch promotions: ${error.message}`);
    return data;
  },

  /**
   * Create a promotion
   */
  async create(promoData) {
    const { data, error } = await supabase
      .from('promotions')
      .insert([{
        ...promoData,
        code: promoData.code.toUpperCase()
      }])
      .select();

    if (error) {
      if (error.code === '23505') {
        throw new Error('A promotion with this code already exists');
      }
      throw new Error(`Failed to create promotion: ${error.message}`);
    }
    return data[0];
  },

  /**
   * Update a promotion
   */
  async update(promoId, updates) {
    const { data, error } = await supabase
      .from('promotions')
      .update(updates)
      .eq('id', promoId)
      .select();

    if (error) throw new Error(`Failed to update promotion: ${error.message}`);
    return data[0];
  },

  /**
   * Delete a promotion
   */
  async delete(promoId) {
    const { error } = await supabase
      .from('promotions')
      .delete()
      .eq('id', promoId);

    if (error) throw new Error(`Failed to delete promotion: ${error.message}`);
  }
};
