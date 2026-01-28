import { supabase } from '@/lib/supabase';

export const contactApi = {
  /**
   * Submit a contact form message
   */
  async submit(messageData) {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{
        name: messageData.name,
        email: messageData.email,
        phone: messageData.phone || null,
        subject: messageData.subject,
        message: messageData.message,
        status: 'new'
      }])
      .select();

    if (error) throw new Error(`Failed to submit contact message: ${error.message}`);
    return data[0];
  },

  /**
   * Get all contact messages (admin only)
   */
  async getAll() {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch contact messages: ${error.message}`);
    return data;
  },

  /**
   * Update message status
   */
  async updateStatus(messageId, status) {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ status })
      .eq('id', messageId)
      .select();

    if (error) throw new Error(`Failed to update message status: ${error.message}`);
    return data[0];
  },

  /**
   * Delete a contact message
   */
  async delete(messageId) {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', messageId);

    if (error) throw new Error(`Failed to delete message: ${error.message}`);
  }
};
