// Order Types
export const ORDER_TYPES = {
  CUPCAKES: 'cupcakes',
  FULL_SHEET: 'full_sheet',
  HALF_SHEET: 'half_sheet',
  QUARTER_SHEET: 'quarter_sheet',
  LAYERED_ROUND: 'layered_round',
  TIERED: 'tiered',
  SPECIALTY: 'specialty',
  OTHER: 'other'
};

export const ORDER_TYPE_LABELS = {
  [ORDER_TYPES.CUPCAKES]: 'Cupcakes',
  [ORDER_TYPES.FULL_SHEET]: 'Full Sheet Cake',
  [ORDER_TYPES.HALF_SHEET]: 'Half Sheet Cake',
  [ORDER_TYPES.QUARTER_SHEET]: 'Quarter Sheet Cake',
  [ORDER_TYPES.LAYERED_ROUND]: 'Layered Round Cake',
  [ORDER_TYPES.TIERED]: 'Tiered Cake',
  [ORDER_TYPES.SPECIALTY]: 'Specialty Cake',
  [ORDER_TYPES.OTHER]: 'Other'
};

// Cake Types
export const CAKE_TYPES = {
  VANILLA: 'vanilla',
  CHOCOLATE: 'chocolate',
  MARBLE: 'marble',
  RED_VELVET: 'red_velvet',
  CARROT: 'carrot',
  LEMON: 'lemon',
  STRAWBERRY: 'strawberry',
  FUNFETTI: 'funfetti',
  OTHER: 'other'
};

export const CAKE_TYPE_LABELS = {
  [CAKE_TYPES.VANILLA]: 'Vanilla',
  [CAKE_TYPES.CHOCOLATE]: 'Chocolate',
  [CAKE_TYPES.MARBLE]: 'Marble',
  [CAKE_TYPES.RED_VELVET]: 'Red Velvet',
  [CAKE_TYPES.CARROT]: 'Carrot',
  [CAKE_TYPES.LEMON]: 'Lemon',
  [CAKE_TYPES.STRAWBERRY]: 'Strawberry',
  [CAKE_TYPES.FUNFETTI]: 'Funfetti',
  [CAKE_TYPES.OTHER]: 'Other'
};

// Gallery Categories
export const GALLERY_CATEGORIES = {
  ALL: 'all',
  BIRTHDAY: 'birthday',
  WEDDING: 'wedding',
  GRADUATION: 'graduation',
  ANNIVERSARY: 'anniversary',
  BABY_SHOWER: 'baby_shower',
  SPECIALTY: 'specialty',
  CUPCAKES: 'cupcakes',
  SEASONAL: 'seasonal'
};

export const GALLERY_CATEGORY_LABELS = {
  [GALLERY_CATEGORIES.ALL]: 'All',
  [GALLERY_CATEGORIES.BIRTHDAY]: 'Birthday',
  [GALLERY_CATEGORIES.WEDDING]: 'Wedding',
  [GALLERY_CATEGORIES.GRADUATION]: 'Graduation',
  [GALLERY_CATEGORIES.ANNIVERSARY]: 'Anniversary',
  [GALLERY_CATEGORIES.BABY_SHOWER]: 'Baby Shower',
  [GALLERY_CATEGORIES.SPECIALTY]: 'Specialty',
  [GALLERY_CATEGORIES.CUPCAKES]: 'Cupcakes',
  [GALLERY_CATEGORIES.SEASONAL]: 'Seasonal'
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  READY: 'ready',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.CONFIRMED]: 'Confirmed',
  [ORDER_STATUS.IN_PROGRESS]: 'In Progress',
  [ORDER_STATUS.READY]: 'Ready for Pickup',
  [ORDER_STATUS.COMPLETED]: 'Completed',
  [ORDER_STATUS.CANCELLED]: 'Cancelled'
};

// Business Information
export const BUSINESS_INFO = {
  owner: 'Chris Shaffer',
  location: 'Avon, IN 46123',
  phone: '317-373-8828',
  email: 'shugscakes@gmail.com',
  facebook: 'https://www.facebook.com/shugscakes',
  instagram: 'https://www.instagram.com/shugscakes',
  pickupHours: {
    weekends: '7:00am - 10:00am',
    weekdays: '7:00am - 6:00pm'
  }
};

// Helper functions
export function getOrderTypeLabel(orderType) {
  if (typeof orderType === 'string') {
    return ORDER_TYPE_LABELS[orderType] || orderType;
  }
  if (orderType && orderType.type) {
    return ORDER_TYPE_LABELS[orderType.type] || orderType.type;
  }
  return 'Unknown';
}

export function getCakeTypeLabel(cakeType) {
  if (typeof cakeType === 'string') {
    return CAKE_TYPE_LABELS[cakeType] || cakeType;
  }
  if (cakeType && cakeType.type) {
    return CAKE_TYPE_LABELS[cakeType.type] || cakeType.type;
  }
  return 'Unknown';
}

export function getOrderStatusLabel(status) {
  return ORDER_STATUS_LABELS[status] || status;
}

export function getGalleryCategoryLabel(category) {
  return GALLERY_CATEGORY_LABELS[category] || category;
}
