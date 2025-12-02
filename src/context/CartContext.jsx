import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, type) => {
    const uniqueId = `${type}-${product.id}`;
    
    setCartItems((prev) => {
      const existing = prev.find((item) => item.uniqueId === uniqueId);
      if (existing) {
        return prev.map((item) =>
          item.uniqueId === uniqueId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, uniqueId, type, quantity: 1 }];
    });

    toast({
      title: "¡Producto agregado!",
      description: `${product.name} se agregó al carrito.`,
      duration: 2000,
    });
  };

  const removeFromCart = (uniqueId) => {
    setCartItems((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
  };

  const updateQuantity = (uniqueId, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.uniqueId === uniqueId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCartItems([]);

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const checkoutWhatsApp = () => {
    if (cartItems.length === 0) return;

    const itemsList = cartItems
      .map((item) => `- ${item.quantity}x ${item.name} ($${item.price * item.quantity})`)
      .join('\n');
    const total = getCartTotal();
    
    const message = encodeURIComponent(
      `¡Hola! Quiero hacer el siguiente pedido:\n\n${itemsList}\n\n*Total Final: $${total}*\n\n¿Cómo seguimos?`
    );
    
    window.open(`https://wa.me/5491124078006?text=${message}`, '_blank');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        checkoutWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};