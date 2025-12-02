import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Hero from '@/components/Hero';
import Catalog from '@/components/Catalog';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import FloatingCartButton from '@/components/FloatingCartButton';
import Navbar from '@/components/Navbar';
import { CartProvider } from '@/context/CartContext';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Navidad no basic');

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      setSelectedCategory('Todos');
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
  };

  return (
    <CartProvider>
      <Helmet>
        <title>Catálogo de Stickers 2025 | Pedí tus favoritos</title>
        <meta name="description" content="Explorá nuestro catálogo de stickers por categoría. Elegí tus favoritos y pedilos directo por WhatsApp. Entregas en Argentina." />
      </Helmet>
      <div className="min-h-screen bg-[#E2E2E2]">
        <Navbar searchQuery={searchQuery} onSearch={handleSearch} />
        <Hero />
        <Catalog 
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          searchQuery={searchQuery}
        />
        <Footer />
        <Cart />
        <FloatingCartButton />
        <Toaster />
      </div>
    </CartProvider>
  );
}

export default App;