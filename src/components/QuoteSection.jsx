import React from 'react';
import { motion } from 'framer-motion';

const QuoteSection = () => {
  const quoteText = 'Most brands waste 70% of influencer budget on wrong creators. We fix that.';
  const [visibleText, setVisibleText] = React.useState('');

  React.useEffect(() => {
    let charIndex = 0;
    let holdTimer;
    let restartTimer;

    const typeNext = () => {
      if (charIndex <= quoteText.length) {
        setVisibleText(quoteText.slice(0, charIndex));
        charIndex += 1;
        return;
      }

      clearInterval(typeInterval);
      holdTimer = setTimeout(() => {
        setVisibleText('');
        charIndex = 0;
        restartTimer = setTimeout(() => {
          typeInterval = setInterval(typeNext, 45);
        }, 450);
      }, 1300);
    };

    let typeInterval = setInterval(typeNext, 45);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(holdTimer);
      clearTimeout(restartTimer);
    };
  }, [quoteText]);

  return (
    <div className="bg-gradient-to-br from-gray-100 to-blue-100 py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-[var(--primary)] leading-relaxed whitespace-pre-line"
          >
            {visibleText}
          </motion.h2> 
        </motion.div>
      </div>
    </div>
  );
};

export default QuoteSection;