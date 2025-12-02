import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';

const StickerCard = ({ sticker }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(sticker, 'sticker');
     toast({
        title: "¡Agregado!",
        description: `"${sticker.name}" se agregó a tu carrito.`,
      });
  };

  const cardVariant = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
    >
      <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-[#C5A1C4] to-[#ECA2BD]">
        <img
  src={sticker.image}
  alt={sticker.name}
  className="rounded-lg w-full h-40 object-cover"
/>

      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-base md:text-lg font-bold text-[#182c3b] mb-2 min-h-[3rem] line-clamp-2">
          {sticker.name}
        </h3>
        
        <p className="text-2xl font-bold text-[#ba4a19] mt-auto mb-4">
          ${sticker.price}
        </p>
        
        <Button
          onClick={handleAddToCart}
          className="w-full bg-[#f26915] hover:bg-[#5a6b75] text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <ShoppingCart className="w-5 h-5 transition-transform group-hover:scale-110" />
          Agregar
        </Button>
      </div>
    </motion.div>
  );
};

export default StickerCard;