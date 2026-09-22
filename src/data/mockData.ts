import type { Category, MenuItem } from '../types/menu';

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat_01', name: 'Starters', display_order: 1 },
  { id: 'cat_02', name: 'Mains & Grills', display_order: 2 },
  { id: 'cat_03', name: 'Artisanal Pizzas', display_order: 3 },
  { id: 'cat_04', name: 'Desserts', display_order: 4 },
  { id: 'cat_05', name: 'Craft Beverages', display_order: 5 },
];

export const MOCK_MENU: MenuItem[] = [
  // Starters
  {
    id: 'item_101',
    category: 'Starters',
    title: 'Truffle Parmesan Fries',
    description: 'Hand-cut golden potatoes tossed in black truffle oil, aged Parmigiano-Reggiano, and fresh rosemary with garlic aioli.',
    price: 13.50,
    image_url: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&q=80&w=800',
    is_available: true,
    tags: ['Gluten-Free', 'Chef Special'],
  },
  {
    id: 'item_102',
    category: 'Starters',
    title: 'Avocado & Mango Tartare',
    description: 'Hass avocado, ripe mango, citrus cilantro dressing, sesame crisps, and chili oil drizzle.',
    price: 15.00,
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
    is_available: true,
    tags: ['Vegan', 'Gluten-Free'],
  },
  {
    id: 'item_103',
    category: 'Starters',
    title: 'Crispy Calamari Fritti',
    description: 'Wild squid rings flash-fried with shishito peppers, lemon zest, and spicy smoked paprika marinara.',
    price: 16.50,
    image_url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&q=80&w=800',
    is_available: false, // Out of stock example
    tags: ['Spicy'],
  },

  // Mains & Grills
  {
    id: 'item_201',
    category: 'Mains & Grills',
    title: 'Pan-Seared Wagyu Ribeye',
    description: '8oz American Wagyu ribeye with roasted bone marrow butter, grilled asparagus, and red wine jus.',
    price: 48.00,
    image_url: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800',
    is_available: true,
    tags: ['Chef Special', 'Gluten-Free'],
  },
  {
    id: 'item_202',
    category: 'Mains & Grills',
    title: 'Wild Mushroom Risotto',
    description: 'Arborio rice simmered in porcini reduction with chanterelles, black truffle paste, and crispy sage.',
    price: 26.00,
    image_url: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&q=80&w=800',
    is_available: true,
    tags: ['Vegan', 'Gluten-Free'],
  },
  {
    id: 'item_203',
    category: 'Mains & Grills',
    title: 'Spicy Harissa Grilled Chicken',
    description: 'Free-range half chicken marinated in North African harissa, mint cucumber labneh, and sumac roasted potatoes.',
    price: 29.50,
    image_url: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&q=80&w=800',
    is_available: true,
    tags: ['Spicy'],
  },
  {
    id: 'item_204',
    category: 'Mains & Grills',
    title: 'Chilean Sea Bass',
    description: 'Miso-glazed Chilean sea bass over ginger baby bok choy and dashi reduction.',
    price: 44.00,
    image_url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800',
    is_available: true,
    tags: ['Chef Special', 'Gluten-Free'],
  },

  // Artisanal Pizzas
  {
    id: 'item_301',
    category: 'Artisanal Pizzas',
    title: 'Truffle & Wild Mushroom Pizza',
    description: 'Fiordilatte mozzarella, roasted hen of the woods, white truffle cream, micro basil, and 24-month aged parmesan.',
    price: 24.00,
    image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    is_available: true,
    tags: ['Chef Special'],
  },
  {
    id: 'item_302',
    category: 'Artisanal Pizzas',
    title: 'Diavola Calabrese',
    description: 'San Marzano tomato sauce, spicy Nduja sausage, hot calabrian salami, fresh mozzarella, and chili honey drop.',
    price: 22.50,
    image_url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800',
    is_available: true,
    tags: ['Spicy'],
  },
  {
    id: 'item_303',
    category: 'Artisanal Pizzas',
    title: 'Garden Herb Margherita',
    description: 'San Marzano plum tomatoes, fresh buffalo mozzarella, heirloom cherry tomatoes, and sweet basil pesto.',
    price: 19.00,
    image_url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=800',
    is_available: true,
    tags: ['Vegan'],
  },

  // Desserts
  {
    id: 'item_401',
    category: 'Desserts',
    title: 'Valrhona Chocolate Lava Cake',
    description: 'Warm molten 70% dark chocolate center, Madagascar bourbon vanilla gelato, and hazelnut praline dust.',
    price: 14.00,
    image_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800',
    is_available: true,
    tags: ['Chef Special'],
  },
  {
    id: 'item_402',
    category: 'Desserts',
    title: 'Matcha Green Tea Panna Cotta',
    description: 'Silky Uji matcha panna cotta, fresh berries, passionfruit reduction, and black sesame crisp.',
    price: 12.50,
    image_url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800',
    is_available: true,
    tags: ['Gluten-Free'],
  },

  // Craft Beverages
  {
    id: 'item_501',
    category: 'Craft Beverages',
    title: 'Smoked Rosemary Mezcalita',
    description: 'Artisanal Mezcal, fresh lime, agave nectar, charred rosemary sprig, and pink Himalayan chili salt rim.',
    price: 17.00,
    image_url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
    is_available: true,
    tags: ['Spicy', 'Chef Special'],
  },
  {
    id: 'item_502',
    category: 'Craft Beverages',
    title: 'Dragonfruit Yuzu Lemonade (Mocktail)',
    description: 'Cold-pressed yuzu juice, red dragonfruit puree, sparkling botanical water, and fresh mint.',
    price: 9.50,
    image_url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
    is_available: true,
    tags: ['Vegan', 'Gluten-Free'],
  }
];
