import React, { useState, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { SearchX, AlertTriangle, ArrowUp, Utensils } from 'lucide-react';

import { useMenu } from './hooks/useMenu';
import type { DietaryTag, MenuItem } from './types/menu';
import { Header } from './components/Header';
import { CategoryTabs } from './components/CategoryTabs';
import { MenuItemCard } from './components/MenuItemCard';
import { DetailModal } from './components/DetailModal';
import { SkeletonLoader } from './components/SkeletonLoader';
import { QRCodeModal } from './components/QRCodeModal';

const queryClient = new QueryClient();

const MenuApp: React.FC = () => {
  const { data, isLoading, isError, refetch, isFetching } = useMenu();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState<DietaryTag>('All');
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const menu = data?.menu || [];
  const categories = data?.categories || [];
  const isMock = data?.isMock || false;

  // Filter menu items by Category, Search Query, and Dietary Tag
  const filteredMenu = useMemo(() => {
    return menu.filter((item) => {
      // Category Filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Dietary Tag Filter
      if (selectedTag !== 'All') {
        const itemTagsLower = item.tags.map((t) => t.toLowerCase());
        if (!itemTagsLower.includes(selectedTag.toLowerCase())) {
          return false;
        }
      }

      // Search Query Filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(query);
        const inDesc = item.description.toLowerCase().includes(query);
        const inCategory = item.category.toLowerCase().includes(query);
        const inTags = item.tags.some((t) => t.toLowerCase().includes(query));
        return inTitle || inDesc || inCategory || inTags;
      }

      return true;
    });
  }, [menu, selectedCategory, selectedTag, searchQuery]);

  // Calculate item count per category for tabs
  const categoryItemCounts = useMemo(() => {
    const counts: Record<string, number> = { All: menu.length };
    menu.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [menu]);

  // Scroll back to top helper
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Header Banner */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
        onOpenQR={() => setIsQRModalOpen(true)}
        onRefresh={() => refetch()}
        isFetching={isFetching}
        isMock={isMock}
      />

      {/* Category Tabs */}
      {!isLoading && !isError && (
        <CategoryTabs
          categories={categories}
          activeCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categoryItemCounts={categoryItemCounts}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-6">
        {/* Loading State */}
        {isLoading && <SkeletonLoader />}

        {/* Error State */}
        {isError && (
          <div className="p-8 text-center bg-stone-900/60 rounded-3xl border border-rose-900/40 my-8 space-y-4">
            <div className="inline-flex p-4 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif text-stone-100">Menu Temporarily Unavailable</h3>
              <p className="text-sm text-stone-400 max-w-md mx-auto mt-1">
                We couldn't connect to the Google Sheet backend right now. Please check your connection or refresh the page.
              </p>
            </div>
            <button
              onClick={() => refetch()}
              className="px-5 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-semibold text-sm hover:bg-amber-400 transition-all shadow-lg shadow-amber-950/40"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Content Rendered when Data is Ready */}
        {!isLoading && !isError && (
          <>
            {/* Active Filter Bar Summary if search or tag is active */}
            {(searchQuery || selectedTag !== 'All') && (
              <div className="flex items-center justify-between bg-stone-900/80 px-4 py-2.5 rounded-xl border border-stone-800 text-xs mb-4 text-stone-300">
                <span>
                  Showing results for{' '}
                  <strong className="text-amber-300">
                    {searchQuery ? `"${searchQuery}"` : ''} {selectedTag !== 'All' ? `[${selectedTag}]` : ''}
                  </strong>{' '}
                  ({filteredMenu.length} items)
                </span>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTag('All');
                  }}
                  className="text-amber-400 hover:underline font-medium"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Empty Search / Filter State */}
            {filteredMenu.length === 0 ? (
              <div className="p-12 text-center bg-stone-900/40 rounded-3xl border border-stone-800/80 my-4 space-y-4">
                <div className="inline-flex p-4 rounded-full bg-stone-800/60 text-amber-400/80">
                  <SearchX className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-stone-200">No dishes match your request</h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Try adjusting your search terms or clearing dietary filters.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTag('All');
                    setSelectedCategory('All');
                  }}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold border border-stone-700 transition-all"
                >
                  Show Full Menu
                </button>
              </div>
            ) : (
              /* Menu Grid Layout */
              <div className="grid grid-cols-1 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredMenu.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      onSelect={(selected) => setSelectedMenuItem(selected)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </>
        )}
      </main>

      {/* Floating Scroll to Top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 rounded-2xl bg-stone-900/90 text-amber-400 border border-stone-800 shadow-xl backdrop-blur-md hover:bg-stone-800 active:scale-95 transition-all z-20"
        title="Scroll to Top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Item Detail Modal */}
      <DetailModal
        item={selectedMenuItem}
        onClose={() => setSelectedMenuItem(null)}
      />

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-stone-950 border-t border-stone-900 py-8 px-4 text-center text-xs text-stone-500 mt-auto">
        <div className="max-w-3xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-stone-400 font-serif">
            <Utensils className="w-4 h-4 text-amber-500" />
            <span>Lumina Bistro & Lounge</span>
          </div>
          <p className="text-[11px] text-stone-500">
            Powered by Google Sheets & SheetDB • Real-Time Digital Menu
          </p>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MenuApp />
    </QueryClientProvider>
  );
}

export default App;
