import React from 'react';
import { motion } from 'framer-motion';
import { Snowflake } from 'lucide-react';
const Hero = () => {
  return <section className="relative py-16 px-4 overflow-hidden bg-[#C5A1C4]">
      <div className="absolute inset-0 opacity-10">
        <motion.div initial={{
        y: -100
      }} animate={{
        y: 0
      }} transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: 'reverse'
      }} className="absolute top-10 left-10">
          <Snowflake className="w-12 h-12 text-white" />
        </motion.div>
        <motion.div initial={{
        y: 0
      }} animate={{
        y: -100
      }} transition={{
        duration: 15,
        repeat: Infinity,
        repeatType: 'reverse',
        delay: 2
      }} className="absolute top-32 right-20">
          <Snowflake className="w-8 h-8 text-white" />
        </motion.div>
        <motion.div initial={{
        y: -50
      }} animate={{
        y: 50
      }} transition={{
        duration: 18,
        repeat: Infinity,
        repeatType: 'reverse',
        delay: 4
      }} className="absolute bottom-20 left-1/3">
          <Snowflake className="w-10 h-10 text-white" />
        </motion.div>
      </div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h1 initial={{
        opacity: 0,
        y: -30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          REGALOS QUE NO SON BASIC
        </motion.h1>
        
        <motion.p initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.3
      }} className="text-lg md:text-xl text-[#E2E2E2] max-w-2xl mx-auto">Elegí tus stickers favoritos</motion.p>
      </div>
    </section>;
};
export default Hero;