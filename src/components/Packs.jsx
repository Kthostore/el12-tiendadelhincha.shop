import React from 'react';
import { motion } from 'framer-motion';
import PackCard from '@/components/PackCard';
import { packs } from '@/data/packs';

const Packs = () => {
  const container = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  return <section className="py-16 px-4 bg-gradient-to-b from-[#E2E2E2] to-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2 initial={{
        opacity: 0,
        y: -20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-3xl md:text-4xl font-bold text-[#280000] text-center mb-4">Packs Personalizados</motion.h2>
        
        <motion.p initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6,
        delay: 0.2
      }} className="text-center text-[#5D5EAA] text-lg mb-12">
          ¡Ahorrá comprando en pack!
        </motion.p>
        
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{
        once: true
      }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packs.map(pack => <PackCard key={pack.id} pack={pack} />)}
        </motion.div>
      </div>
    </section>;
};
export default Packs;