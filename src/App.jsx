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
    <div className="min-h-screen bg-background">
  {/* Aquí va el resto del contenido */}
</div>


    
  );
}

export default App;