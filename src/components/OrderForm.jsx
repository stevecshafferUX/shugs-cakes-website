import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Cake, Cookie, Dessert, Square, Circle, Layers, RectangleHorizontal, Star, Candy, CakeSlice, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

function OrderForm() {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.user_metadata?.full_name || '',
    phone: '',
    email: user?.email || '',
    theme: '',
    dueDate: '',
    servings: '',
    cost: '',
    orderType: {
      cake: false,
      cupcake: false,
      cookies: false,
      desserts: false
    },
    cakeType: {
      sheet: false,
      round: false,
      tiered: false,
      square: false,
      shaped: false,
      smash: false,
      other: false
    },
    details: ''
  });

  const orderTypeOptions = [
    { key: 'cake', label: 'Cake', icon: Cake, priceRange: '$45-$200+' },
    { key: 'cupcake', label: 'Cupcakes', icon: CakeSlice, priceRange: '$24-$60' },
    { key: 'cookies', label: 'Cookies', icon: Cookie, priceRange: '$18-$45' },
    { key: 'desserts', label: 'Desserts', icon: Dessert, priceRange: '$25-$75' }
  ];

  const cakeTypeOptions = [
    { key: 'sheet', label: 'Sheet', icon: RectangleHorizontal, priceRange: '$45-$85' },
    { key: 'round', label: 'Round', icon: Circle, priceRange: '$50-$120' },
    { key: 'tiered', label: 'Tiered', icon: Layers, priceRange: '$150-$400+' },
    { key: 'square', label: 'Square', icon: Square, priceRange: '$50-$120' },
    { key: 'shaped', label: 'Shaped', icon: Star, priceRange: '$75-$200+' },
    { key: 'smash', label: 'Smash', icon: Candy, priceRange: '$35-$65' },
    { key: 'other', label: 'Other', icon: HelpCircle, priceRange: 'Varies' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (category, field) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: !prev[category][field]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Prepare order data
      const orderData = {
        user_id: user?.id || null,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        theme: formData.theme,
        due_date: formData.dueDate,
        servings: formData.servings ? parseInt(formData.servings) : null,
        cost: formData.cost ? parseFloat(formData.cost) : null,
        order_type: formData.orderType,
        cake_type: formData.cakeType,
        details: formData.details,
        status: 'pending',
      };

      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select();

      if (error) throw error;

      toast.success('Order submitted successfully! We will contact you soon.');

      // Reset form
      setFormData({
        name: user?.user_metadata?.full_name || '',
        phone: '',
        email: user?.email || '',
        theme: '',
        dueDate: '',
        servings: '',
        cost: '',
        orderType: { cake: false, cupcake: false, cookies: false, desserts: false },
        cakeType: { sheet: false, round: false, tiered: false, square: false, shaped: false, smash: false, other: false },
        details: ''
      });
    } catch (error) {
      console.error('Error submitting order:', error);

      // Provide more helpful error messages
      let errorMessage = 'Error submitting order. ';

      if (error.message) {
        errorMessage += `Details: ${error.message}`;
      } else {
        errorMessage += 'Please try again or contact us directly.';
      }

      // Add specific guidance for common errors
      if (error.message && error.message.includes('JWT')) {
        errorMessage += '\n\nPlease try signing out and signing back in.';
      } else if (error.message && error.message.includes('network')) {
        errorMessage += '\n\nPlease check your internet connection.';
      } else if (error.code === 'PGRST116') {
        errorMessage += '\n\nThe orders table may not exist in the database. Please contact support.';
      }

      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <form onSubmit={handleSubmit}>
        <div className="max-w-3xl mx-auto space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Order Form</h1>
            <p className="text-muted-foreground">Fill out the details below to place your custom order</p>
          </div>
            {/* Contact Information */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>

                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={!!user}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Order Type */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Order Type</h2>
                <p className="text-sm text-muted-foreground mb-4">What would you like to order? (Select all that apply)</p>
                <div className="grid grid-cols-2 gap-3">
                  {orderTypeOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = formData.orderType[option.key];
                    return (
                      <div key={option.key}>
                        <div
                          onClick={() => handleCheckboxChange('orderType', option.key)}
                          className={cn(
                            "border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md",
                            isSelected
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <div className="flex flex-col items-center text-center gap-2">
                            <Icon className={cn("h-8 w-8", isSelected ? "text-primary" : "text-muted-foreground")} />
                            <span className="font-medium">{option.label}</span>
                            <span className="text-xs text-muted-foreground">{option.priceRange}</span>
                          </div>
                        </div>

                        {/* Inline Cake Type options - Only show when Cake is selected */}
                        {option.key === 'cake' && isSelected && (
                          <div className="mt-3 p-3 bg-muted/20 rounded-lg border border-primary/20">
                            <p className="text-sm font-medium mb-2 text-center">Select cake style:</p>
                            <div className="grid grid-cols-2 gap-2">
                              {cakeTypeOptions.map((cakeOption) => {
                                const CakeIcon = cakeOption.icon;
                                const isCakeSelected = formData.cakeType[cakeOption.key];
                                return (
                                  <div
                                    key={cakeOption.key}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCheckboxChange('cakeType', cakeOption.key);
                                    }}
                                    className={cn(
                                      "border rounded p-2 cursor-pointer transition-all hover:shadow-sm text-center",
                                      isCakeSelected
                                        ? "border-primary bg-primary/20"
                                        : "border-border hover:border-primary/30 bg-background"
                                    )}
                                  >
                                    <CakeIcon className={cn("h-4 w-4 mx-auto mb-1", isCakeSelected ? "text-primary" : "text-muted-foreground")} />
                                    <span className="text-xs font-medium block">{cakeOption.label}</span>
                                    <span className="text-xs text-muted-foreground block">{cakeOption.priceRange}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Details */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h2 className="text-2xl font-semibold mb-4">Order Details</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Input
                      type="text"
                      id="theme"
                      name="theme"
                      value={formData.theme}
                      onChange={handleInputChange}
                      placeholder="e.g., Birthday, Wedding"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      type="date"
                      id="dueDate"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="servings">Servings</Label>
                    <Input
                      type="number"
                      id="servings"
                      name="servings"
                      value={formData.servings}
                      onChange={handleInputChange}
                      placeholder="Number of servings"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cost">Your Budget</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        type="number"
                        id="cost"
                        name="cost"
                        value={formData.cost}
                        onChange={handleInputChange}
                        step="0.01"
                        className="pl-7"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">Additional Details</Label>
                  <p className="text-sm text-muted-foreground">
                    Please provide as much detail as possible about your order
                  </p>
                  <Textarea
                    name="details"
                    value={formData.details}
                    onChange={handleInputChange}
                    rows={10}
                    placeholder="Include details such as:&#10;• Flavors (cake, frosting, filling)&#10;• Colors and design preferences&#10;• Text or writing on the cake&#10;• Decorations or special requests&#10;• Dietary restrictions or allergies&#10;• Any reference images or inspiration"
                  />
                </div>
              </CardContent>
            </Card>
        </div>

        <div className="mt-8 flex justify-center">
          <Button type="submit" size="lg" className="px-12" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Order'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default OrderForm;
