import { supabase } from '@/lib/supabase';

export const ordersApi = {
  /**
   * Create a new order
   */
  async create(orderData) {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select();

    if (error) throw new Error(`Failed to create order: ${error.message}`);
    return data[0];
  },

  /**
   * Get all orders (admin only)
   */
  async getAll() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch orders: ${error.message}`);
    return data;
  },

  /**
   * Get orders for a specific user
   */
  async getByUserId(userId) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch user orders: ${error.message}`);
    return data;
  },

  /**
   * Get a single order by ID
   */
  async getById(orderId) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error) throw new Error(`Failed to fetch order: ${error.message}`);
    return data;
  },

  /**
   * Update an order
   */
  async update(orderId, updates) {
    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId)
      .select();

    if (error) throw new Error(`Failed to update order: ${error.message}`);
    return data[0];
  },

  /**
   * Update order status
   */
  async updateStatus(orderId, status) {
    return this.update(orderId, { status });
  },

  /**
   * Delete an order
   */
  async delete(orderId) {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', orderId);

    if (error) throw new Error(`Failed to delete order: ${error.message}`);
  },

  /**
   * Get order statistics
   */
  async getStats() {
    const { data, error } = await supabase
      .from('orders')
      .select('status');

    if (error) throw new Error(`Failed to fetch order stats: ${error.message}`);

    const stats = {
      total: data.length,
      pending: data.filter(o => o.status === 'pending').length,
      confirmed: data.filter(o => o.status === 'confirmed').length,
      in_progress: data.filter(o => o.status === 'in_progress').length,
      ready: data.filter(o => o.status === 'ready').length,
      completed: data.filter(o => o.status === 'completed').length,
      cancelled: data.filter(o => o.status === 'cancelled').length
    };

    return stats;
  }
};
