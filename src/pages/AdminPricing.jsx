import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { pricingApi } from '@/api/pricing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Plus, Pencil, Trash2, ArrowLeft, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

function AdminPricing() {
  const { isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  // Data state
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cakeTypes, setCakeTypes] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'product', 'category', 'cakeType', 'flavor'
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
      return;
    }
    fetchAllData();
  }, [isAdmin, navigate]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [productsData, categoriesData, cakeTypesData, flavorsData] = await Promise.all([
        pricingApi.getProducts(),
        pricingApi.getCategories(),
        pricingApi.getCakeTypes(),
        pricingApi.getFlavors(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
      setCakeTypes(cakeTypesData);
      setFlavors(flavorsData);
    } catch (error) {
      console.error('Error fetching pricing data:', error);
      toast.error('Failed to load pricing data');
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // DIALOG HELPERS
  // ========================================
  const openCreateDialog = (type) => {
    setDialogType(type);
    setEditingItem(null);
    setFormData(getDefaultFormData(type));
    setDialogOpen(true);
  };

  const openEditDialog = (type, item) => {
    setDialogType(type);
    setEditingItem(item);
    setFormData({ ...item });
    setDialogOpen(true);
  };

  const getDefaultFormData = (type) => {
    switch (type) {
      case 'product':
        return {
          name: '',
          description: '',
          category_id: '',
          base_price: '',
          price_per_serving: '',
          min_servings: '',
          max_servings: '',
          preparation_days: 3,
          is_active: true,
        };
      case 'category':
        return { name: '', description: '', display_order: 0, is_active: true };
      case 'cakeType':
        return { name: '', description: '', price_modifier: '', display_order: 0, is_active: true };
      case 'flavor':
        return { name: '', description: '', price_modifier: '', display_order: 0, is_active: true };
      default:
        return {};
    }
  };

  const getDialogTitle = () => {
    const action = editingItem ? 'Edit' : 'Add';
    switch (dialogType) {
      case 'product': return `${action} Product`;
      case 'category': return `${action} Category`;
      case 'cakeType': return `${action} Cake Type`;
      case 'flavor': return `${action} Flavor`;
      default: return '';
    }
  };

  // ========================================
  // SAVE HANDLER
  // ========================================
  const handleSave = async () => {
    setSaving(true);
    try {
      const cleanData = { ...formData };

      // Clean numeric fields
      if (dialogType === 'product') {
        cleanData.base_price = parseFloat(cleanData.base_price) || 0;
        cleanData.price_per_serving = cleanData.price_per_serving ? parseFloat(cleanData.price_per_serving) : null;
        cleanData.min_servings = cleanData.min_servings ? parseInt(cleanData.min_servings) : null;
        cleanData.max_servings = cleanData.max_servings ? parseInt(cleanData.max_servings) : null;
        cleanData.preparation_days = parseInt(cleanData.preparation_days) || 3;
        if (!cleanData.category_id) delete cleanData.category_id;
      }
      if (dialogType === 'cakeType' || dialogType === 'flavor') {
        cleanData.price_modifier = parseFloat(cleanData.price_modifier) || 0;
      }
      cleanData.display_order = parseInt(cleanData.display_order) || 0;

      // Remove fields that shouldn't be sent to API
      delete cleanData.id;
      delete cleanData.created_at;
      delete cleanData.updated_at;
      delete cleanData.product_categories;

      if (editingItem) {
        // Update
        switch (dialogType) {
          case 'product':
            await pricingApi.updateProduct(editingItem.id, cleanData);
            break;
          case 'category':
            await pricingApi.updateCategory(editingItem.id, cleanData);
            break;
          case 'cakeType':
            await pricingApi.updateCakeType(editingItem.id, cleanData);
            break;
          case 'flavor':
            await pricingApi.updateFlavor(editingItem.id, cleanData);
            break;
        }
        toast.success(`${getDialogTitle().replace('Edit ', '')} updated successfully`);
      } else {
        // Create
        switch (dialogType) {
          case 'product':
            await pricingApi.createProduct(cleanData);
            break;
          case 'category':
            await pricingApi.createCategory(cleanData);
            break;
          case 'cakeType':
            await pricingApi.createCakeType(cleanData);
            break;
          case 'flavor':
            await pricingApi.createFlavor(cleanData);
            break;
        }
        toast.success(`${getDialogTitle().replace('Add ', '')} created successfully`);
      }

      setDialogOpen(false);
      fetchAllData();
    } catch (error) {
      console.error('Error saving:', error);
      toast.error(`Failed to save: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // DELETE HANDLER
  // ========================================
  const handleDelete = async (type, id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      switch (type) {
        case 'product':
          await pricingApi.deleteProduct(id);
          break;
        case 'category':
          await pricingApi.deleteCategory(id);
          break;
        case 'cakeType':
          await pricingApi.deleteCakeType(id);
          break;
        case 'flavor':
          await pricingApi.deleteFlavor(id);
          break;
      }
      toast.success(`"${name}" deleted successfully`);
      fetchAllData();
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error(`Failed to delete: ${error.message}`);
    }
  };

  // ========================================
  // FORM FIELD UPDATER
  // ========================================
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isAdmin) return null;

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <DollarSign className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Pricing Management</h1>
            <p className="text-muted-foreground">Manage products, cake types, and flavors</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading pricing data...</div>
      ) : (
        <Tabs defaultValue="products">
          <TabsList className="mb-6">
            <TabsTrigger value="products">Products ({products.length})</TabsTrigger>
            <TabsTrigger value="categories">Categories ({categories.length})</TabsTrigger>
            <TabsTrigger value="cakeTypes">Cake Types ({cakeTypes.length})</TabsTrigger>
            <TabsTrigger value="flavors">Flavors ({flavors.length})</TabsTrigger>
          </TabsList>

          {/* ========================================
              PRODUCTS TAB
              ======================================== */}
          <TabsContent value="products">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Products</CardTitle>
                <Button onClick={() => openCreateDialog('product')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                {products.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">No products yet. Add your first product.</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Base Price</TableHead>
                        <TableHead>Per Serving</TableHead>
                        <TableHead>Servings</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="font-medium">{product.name}</div>
                            {product.description && (
                              <div className="text-sm text-muted-foreground">{product.description}</div>
                            )}
                          </TableCell>
                          <TableCell>{product.product_categories?.name || '—'}</TableCell>
                          <TableCell>${parseFloat(product.base_price).toFixed(2)}</TableCell>
                          <TableCell>
                            {product.price_per_serving
                              ? `$${parseFloat(product.price_per_serving).toFixed(2)}`
                              : '—'}
                          </TableCell>
                          <TableCell>
                            {product.min_servings
                              ? `${product.min_servings}${product.max_servings ? `–${product.max_servings}` : '+'}`
                              : '—'}
                          </TableCell>
                          <TableCell>
                            <Badge variant={product.is_active ? 'default' : 'secondary'}>
                              {product.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={() => openEditDialog('product', product)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleDelete('product', product.id, product.name)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========================================
              CATEGORIES TAB
              ======================================== */}
          <TabsContent value="categories">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Product Categories</CardTitle>
                <Button onClick={() => openCreateDialog('category')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                {categories.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">No categories yet.</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Order</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((cat) => (
                        <TableRow key={cat.id}>
                          <TableCell className="font-medium">{cat.name}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{cat.description || '—'}</TableCell>
                          <TableCell>{cat.display_order}</TableCell>
                          <TableCell>
                            <Badge variant={cat.is_active ? 'default' : 'secondary'}>
                              {cat.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={() => openEditDialog('category', cat)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleDelete('category', cat.id, cat.name)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========================================
              CAKE TYPES TAB
              ======================================== */}
          <TabsContent value="cakeTypes">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Cake Types</CardTitle>
                <Button onClick={() => openCreateDialog('cakeType')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Cake Type
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                {cakeTypes.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">No cake types yet.</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Price Modifier</TableHead>
                        <TableHead>Order</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cakeTypes.map((type) => (
                        <TableRow key={type.id}>
                          <TableCell className="font-medium">{type.name}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{type.description || '—'}</TableCell>
                          <TableCell>
                            {parseFloat(type.price_modifier) > 0
                              ? `+$${parseFloat(type.price_modifier).toFixed(2)}`
                              : parseFloat(type.price_modifier) < 0
                              ? `-$${Math.abs(parseFloat(type.price_modifier)).toFixed(2)}`
                              : '$0.00'}
                          </TableCell>
                          <TableCell>{type.display_order}</TableCell>
                          <TableCell>
                            <Badge variant={type.is_active ? 'default' : 'secondary'}>
                              {type.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={() => openEditDialog('cakeType', type)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleDelete('cakeType', type.id, type.name)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========================================
              FLAVORS TAB
              ======================================== */}
          <TabsContent value="flavors">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Flavors</CardTitle>
                <Button onClick={() => openCreateDialog('flavor')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Flavor
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                {flavors.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">No flavors yet.</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Price Modifier</TableHead>
                        <TableHead>Order</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {flavors.map((flavor) => (
                        <TableRow key={flavor.id}>
                          <TableCell className="font-medium">{flavor.name}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{flavor.description || '—'}</TableCell>
                          <TableCell>
                            {parseFloat(flavor.price_modifier) > 0
                              ? `+$${parseFloat(flavor.price_modifier).toFixed(2)}`
                              : '$0.00'}
                          </TableCell>
                          <TableCell>{flavor.display_order}</TableCell>
                          <TableCell>
                            <Badge variant={flavor.is_active ? 'default' : 'secondary'}>
                              {flavor.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={() => openEditDialog('flavor', flavor)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleDelete('flavor', flavor.id, flavor.name)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* ========================================
          SHARED DIALOG FOR CREATE/EDIT
          ======================================== */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{getDialogTitle()}</DialogTitle>
            <DialogDescription>
              {editingItem ? 'Update the details below.' : 'Fill in the details below to create a new item.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Name - shared by all types */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Enter name"
              />
            </div>

            {/* Description - shared by all types */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Enter description (optional)"
                rows={2}
              />
            </div>

            {/* Product-specific fields */}
            {dialogType === 'product' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="category_id">Category</Label>
                  <Select
                    value={formData.category_id || ''}
                    onValueChange={(value) => updateField('category_id', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="base_price">Base Price ($)</Label>
                    <Input
                      id="base_price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.base_price ?? ''}
                      onChange={(e) => updateField('base_price', e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price_per_serving">Per Serving ($)</Label>
                    <Input
                      id="price_per_serving"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price_per_serving ?? ''}
                      onChange={(e) => updateField('price_per_serving', e.target.value)}
                      placeholder="Optional"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="min_servings">Min Servings</Label>
                    <Input
                      id="min_servings"
                      type="number"
                      min="1"
                      value={formData.min_servings ?? ''}
                      onChange={(e) => updateField('min_servings', e.target.value)}
                      placeholder="e.g. 12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max_servings">Max Servings</Label>
                    <Input
                      id="max_servings"
                      type="number"
                      min="1"
                      value={formData.max_servings ?? ''}
                      onChange={(e) => updateField('max_servings', e.target.value)}
                      placeholder="e.g. 96"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preparation_days">Preparation Days</Label>
                  <Input
                    id="preparation_days"
                    type="number"
                    min="1"
                    value={formData.preparation_days ?? 3}
                    onChange={(e) => updateField('preparation_days', e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Price modifier for cake types and flavors */}
            {(dialogType === 'cakeType' || dialogType === 'flavor') && (
              <div className="space-y-2">
                <Label htmlFor="price_modifier">
                  Price Modifier ($)
                  <span className="text-muted-foreground text-xs ml-2">
                    Use negative for discounts
                  </span>
                </Label>
                <Input
                  id="price_modifier"
                  type="number"
                  step="0.01"
                  value={formData.price_modifier ?? ''}
                  onChange={(e) => updateField('price_modifier', e.target.value)}
                  placeholder="0.00"
                />
              </div>
            )}

            {/* Display order for non-products */}
            {dialogType !== 'product' && (
              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  min="0"
                  value={formData.display_order ?? 0}
                  onChange={(e) => updateField('display_order', e.target.value)}
                />
              </div>
            )}

            {/* Active toggle */}
            <div className="flex items-center gap-3">
              <Label htmlFor="is_active">Active</Label>
              <input
                id="is_active"
                type="checkbox"
                checked={formData.is_active ?? true}
                onChange={(e) => updateField('is_active', e.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-sm text-muted-foreground">
                {formData.is_active ? 'Visible on pricing page' : 'Hidden from pricing page'}
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving || !formData.name?.trim()}>
              {saving ? 'Saving...' : editingItem ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminPricing;
