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

    if (error) throw new Error(`Failed to fetch categories: ${error.message}`);
    return data || [];
  },

  async createCategory(categoryData) {
    const { data, error } = await supabase
      .from('product_categories')
      .insert(categoryData)
      .select()
      .single();

    if (error) throw new Error(`Failed to create category: ${error.message}`);
    return data;
  },

  async updateCategory(id, updates) {
    const { data, error } = await supabase
      .from('product_categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update category: ${error.message}`);
    return data;
  },

  async deleteCategory(id) {
    const { error } = await supabase
      .from('product_categories')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete category: ${error.message}`);
  },

  // ========================================
  // PRODUCTS
  // ========================================
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*, product_categories(name)')
      .order('created_at', { ascending: true });

    if (error) throw new Error(`Failed to fetch products: ${error.message}`);
    return data || [];
  },

  async getActiveProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*, product_categories(name)')
      .eq('is_active', true)
      .order('created_at', { ascending: true });

    if (error) throw new Error(`Failed to fetch products: ${error.message}`);
    return data || [];
  },

  async createProduct(productData) {
    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select('*, product_categories(name)')
      .single();

    if (error) throw new Error(`Failed to create product: ${error.message}`);
    return data;
  },

  async updateProduct(id, updates) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select('*, product_categories(name)')
      .single();

    if (error) throw new Error(`Failed to update product: ${error.message}`);
    return data;
  },

  async deleteProduct(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete product: ${error.message}`);
  },

  // ========================================
  // CAKE TYPES
  // ========================================
  async getCakeTypes() {
    const { data, error } = await supabase
      .from('cake_types')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw new Error(`Failed to fetch cake types: ${error.message}`);
    return data || [];
  },

  async getActiveCakeTypes() {
    const { data, error } = await supabase
      .from('cake_types')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw new Error(`Failed to fetch cake types: ${error.message}`);
    return data || [];
  },

  async createCakeType(cakeTypeData) {
    const { data, error } = await supabase
      .from('cake_types')
      .insert(cakeTypeData)
      .select()
      .single();

    if (error) throw new Error(`Failed to create cake type: ${error.message}`);
    return data;
  },

  async updateCakeType(id, updates) {
    const { data, error } = await supabase
      .from('cake_types')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update cake type: ${error.message}`);
    return data;
  },

  async deleteCakeType(id) {
    const { error } = await supabase
      .from('cake_types')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete cake type: ${error.message}`);
  },

  // ========================================
  // FLAVORS
  // ========================================
  async getFlavors() {
    const { data, error } = await supabase
      .from('flavors')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw new Error(`Failed to fetch flavors: ${error.message}`);
    return data || [];
  },

  async getActiveFlavors() {
    const { data, error } = await supabase
      .from('flavors')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw new Error(`Failed to fetch flavors: ${error.message}`);
    return data || [];
  },

  async createFlavor(flavorData) {
    const { data, error } = await supabase
      .from('flavors')
      .insert(flavorData)
      .select()
      .single();

    if (error) throw new Error(`Failed to create flavor: ${error.message}`);
    return data;
  },

  async updateFlavor(id, updates) {
    const { data, error } = await supabase
      .from('flavors')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update flavor: ${error.message}`);
    return data;
  },

  async deleteFlavor(id) {
    const { error } = await supabase
      .from('flavors')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete flavor: ${error.message}`);
  },
};
