import { useQuery } from '@tanstack/react-query';
import { fetchMenuItems } from '../services/api';
import { MOCK_MENU, MOCK_CATEGORIES } from '../data/mockData';
import type { Category } from '../types/menu';

export function useMenu() {
  return useQuery({
    queryKey: ['menuData'],
    queryFn: async () => {
      const realItems = await fetchMenuItems();

      const isMock = realItems.length === 0;
      const menu = isMock ? MOCK_MENU : realItems;

      let categories: Category[] = [];

      if (isMock) {
        categories = MOCK_CATEGORIES;
      } else {
        // Derive dynamic category list from real sheet menu items
        const uniqueCategories = Array.from(
          new Set(menu.map((item) => item.category).filter(Boolean))
        );

        categories = uniqueCategories.map((name, index) => ({
          id: `cat_${index + 1}`,
          name,
          display_order: index + 1,
        }));
      }

      return {
        menu,
        categories,
        isMock,
      };
    },
    staleTime: 1000 * 60 * 1, // Cache for 1 minute
    refetchOnWindowFocus: true,
    retry: 2,
  });
}