export interface MenuItem {
  id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  is_available: boolean;
  tags: string[];
}

export interface RawMenuItem {
  id?: string;
  category?: string;
  title?: string;
  description?: string;
  price?: string | number;
  image_url?: string;
  is_available?: string | boolean;
  tags?: string;
}

export interface Category {
  id: string;
  name: string;
  display_order: number;
}

export interface RawCategory {
  id?: string;
  name?: string;
  display_order?: string | number;
}

export type DietaryTag = 'All' | 'Vegan' | 'Gluten-Free' | 'Spicy' | 'Chef Special';
