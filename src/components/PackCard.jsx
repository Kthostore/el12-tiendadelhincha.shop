import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const PackCard = ({ pack }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(pack, 'pack');
  };

  const cardVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#ECA2BD]"
    >
      <div className="p-6 text-center" style={{ backgroundColor: `${pack.color}15` }}>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
          style={{ backgroundColor: pack.color }}
        >
          <Package className="w-10 h-10 text-white" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-[#280000] mb-2">
          {pack.name}
        </h3>
        
        <p className="text-[#5D5EAA] mb-4 min-h-[3rem]">
          {pack.description}
        </p>
        
        <div className="mb-6">
          <span className="text-sm text-gray-500 line-through block mb-1">
            ${pack.quantity * 250}
          </span>
          <p className="text-4xl font-bold" style={{ color: pack.color }}>
            ${pack.price}
          </p>
          <p className="text-sm text-green-600 font-semibold mt-1">
            ¡Ahorrás ${(pack.quantity * 250) - pack.price}!
          </p>
        </div>
        
        <Button
          onClick={handleAddToCart}
          className="w-full text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
          style={{ backgroundColor: pack.color }}
        >
          <ShoppingCart className="w-5 h-5 transition-transform group-hover:scale-110" />
          Agregar al carrito
        </Button>
      </div>
    </motion.div>
  );
};

export default PackCard;