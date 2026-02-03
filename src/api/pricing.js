import { supabase } from '@/lib/supabase';

export const pricingApi = {
  // ========================================
  // PRODUCT CATEGORIES
  // ========================================
  async getCategories() {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async createCategory(categoryData) {
    const { data, error } = await supabase
      .from('product_categories')
      .insert(categoryData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateCategory(id, updates) {
    const { data, error } = await supabase
      .from('product_categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteCategory(id) {
    const { error } = await supabase
      .from('product_categories')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // ========================================
  // PRODUCTS
  // ========================================
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*, product_categories(name)')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getActiveProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*, product_categories(name)')
      .eq('is_active', true)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async createProduct(productData) {
    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select('*, product_categories(name)')
      .single();

    if (error) throw error;
    return data;
  },

  async updateProduct(id, updates) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select('*, product_categories(name)')
      .single();

    if (error) throw error;
    return data;
  },

  async deleteProduct(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // ========================================
  // CAKE TYPES
  // ========================================
  async getCakeTypes() {
    const { data, error } = await supabase
      .from('cake_types')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getActiveCakeTypes() {
    const { data, error } = await supabase
      .from('cake_types')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async createCakeType(cakeTypeData) {
    const { data, error } = await supabase
      .from('cake_types')
      .insert(cakeTypeData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateCakeType(id, updates) {
    const { data, error } = await supabase
      .from('cake_types')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteCakeType(id) {
    const { error } = await supabase
      .from('cake_types')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // ========================================
  // FLAVORS
  // ========================================
  async getFlavors() {
    const { data, error } = await supabase
      .from('flavors')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getActiveFlavors() {
    const { data, error } = await supabase
      .from('flavors')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async createFlavor(flavorData) {
    const { data, error } = await supabase
      .from('flavors')
      .insert(flavorData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateFlavor(id, updates) {
    const { data, error } = await supabase
      .from('flavors')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteFlavor(id) {
    const { error } = await supabase
      .from('flavors')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
