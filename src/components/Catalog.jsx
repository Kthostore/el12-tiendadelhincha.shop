
import React, { useMemo, useState, useEffect } from 'react';
import StickerCard from '@/components/StickerCard';
import Categories from '@/components/Categories';
import { getStickers } from '@/data/stickers';
import { useToast } from '@/components/ui/use-toast';

const Catalog = ({ selectedCategory, onSelectCategory, searchQuery }) => {
  const { toast } = useToast();
  const [allStickers, setAllStickers] = useState([]);


  const handleSelectCategoryWrapper = (category) => {
    onSelectCategory(category);
    
    const hasItems = category === 'Todos' || allStickers.some(sticker => sticker.category === category);
    if (!hasItems) {
      toast({
        title: "Próximamente",
        description: `🚧 Aún no tenemos Pilcha de "${category}", ¡pero estamos en ello! 🚀`,
      });
    }
  };

 // Calculate the base list of stickers based on filters
const filteredStickers = useMemo(() => {
  let result = allStickers;

  if (selectedCategory !== 'Todos') {
    result = result.filter(sticker => sticker.category === selectedCategory);
  }
  
  if (searchQuery) {
    result = result.filter(sticker => 
      sticker.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return result;
}, [selectedCategory, searchQuery]);

useEffect(() => {
  async function loadProducts() {
    const stickersFromSheets = await getStickers();
    setAllStickers(stickersFromSheets);
    setVisibleStickers(stickersFromSheets);
  }
  loadProducts();
}, []);


  // Infinite scroll logic: specific for "Todos" category
  useEffect(() => {
    // Requirement: "On home page and when category 'todos' is selected"
    if (selectedCategory !== 'Todos') return;

    const handleScroll = () => {
      // Check if the user has scrolled near the bottom of the document
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 200; // 200px buffer

      if (scrollPosition >= threshold) {
        // Duplicate the products by appending the original filtered list to the current view
        // This creates the requested "infinite loop" effect
        setVisibleStickers(prev => {
            // Prevent appending if base list is empty to avoid weirdness
            if (filteredStickers.length === 0) return prev;
            return [...prev, ...filteredStickers];
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedCategory, filteredStickers]);

  const hasStickers = visibleStickers.length > 0;

  return (
    <section className="py-8 md:py-12 bg-[#E2E2E2]">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-6 md:gap-8">
        <Categories selectedCategory={selectedCategory} onSelectCategory={handleSelectCategoryWrapper} />
        
        {/* Main Product Grid Container - expands naturally with content */}
        <div className="rounded-3xl bg-white/30 backdrop-blur-sm border border-white/20 shadow-inner p-4 md:p-6 min-h-[400px]">
             {hasStickers ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {visibleStickers.map((sticker, index) => (
                    <StickerCard 
                      // We use a composite key (ID + index) because items are intentionally duplicated
                      key={`${sticker.id}-${index}`} 
                      sticker={sticker} 
                    />
                  ))}
                </div>
              ) : (
                 <div className="w-full flex flex-col items-center justify-center text-center p-8 min-h-[300px]">
                    <p className="text-lg text-gray-600 font-medium">
                      {searchQuery 
                        ? `No encontramos stickers que coincidan con "${searchQuery}"`
                        : "No hay stickers en esta categoría... todavía."
                      }
                    </p>
                    <p className="text-sm text-gray-500 mt-2">Prueba con otra búsqueda o categoría.</p>
                </div>
              )}
        </div>
      </div>
    </section>
  );
};
export default Catalog;
