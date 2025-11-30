import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppFloatButton = ({ 
  phoneNumber = '+919148561949', 
  message = 'Hello, I have a question!',
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [portalElement, setPortalElement] = useState(null);

  useEffect(() => {
    // Create a portal container at the document level
    let element = document.getElementById('whatsapp-portal-container');
    
    if (!element) {
      element = document.createElement('div');
      element.id = 'whatsapp-portal-container';
      
      // Apply styles to ensure it's always on top
      element.style.position = 'fixed';
      element.style.zIndex = '99999'; // Higher than anything else
      element.style.pointerEvents = 'none'; // Allow clicks to pass through by default
      element.style.width = '100%';
      element.style.height = '100%';
      element.style.top = '0';
      element.style.left = '0';
      
      // Add to body
      document.body.appendChild(element);
      
      // Add global CSS to ensure other elements don't overlap
      const style = document.createElement('style');
      style.innerHTML = `
        /* Make sure the problematic div stays behind */
        .mx-auto.flex.max-w-7xl.items-end.justify-between.p-4,
        .mx-auto.flex.max-w-7xl.items-end.justify-between.md\\:p-8,
        .mx-auto.flex.max-w-7xl.items-end.justify-between.p-4.md\\:p-8 {
          z-index: 10 !important;
          position: relative !important;
        }
        
        /* Make sure whatsapp button is always on top */
        #whatsapp-portal-container {
          isolation: isolate;
        }
        
        #whatsapp-portal-container > div {
          pointer-events: auto !important;
        }
      `;
      document.head.appendChild(style);
    }
    
    setPortalElement(element);
    
    // Cleanup on unmount
    return () => {
      // Only remove if this is the only instance using it
      if (document.querySelectorAll('[id^="whatsapp-float-"]').length <= 1) {
        document.body.removeChild(element);
      }
    };
  }, []);

  const handleWhatsAppChat = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Component to be rendered into the portal
  const WhatsAppButtonContent = () => (
    <div 
      id={`whatsapp-float-${Math.random().toString(36).substr(2, 9)}`}
      className={`${className}`} 
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        pointerEvents: 'auto',
      }}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-full mb-4 right-0 bg-white shadow-2xl rounded-2xl p-6 border border-gray-100 w-80"
          >
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Chat with us</h3>
              <p className="text-sm text-gray-600 mb-4">on WhatsApp</p>
              
              <motion.button 
                onClick={handleWhatsAppChat}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-xl flex items-center justify-center font-semibold shadow-lg transition-all duration-300"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="mr-2"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span className="text-sm">Start Chat</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button 
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl relative transition-all duration-300"
        style={{
          boxShadow: '0 8px 32px rgba(34, 197, 94, 0.3)'
        }}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </motion.div>
        
        {/* Pulse animation */}
        <motion.div
          className="absolute inset-0 rounded-full bg-green-500"
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>
    </div>
  );

  // Render nothing in the component's original place, and use portal instead
  return (
    <>
      {portalElement && ReactDOM.createPortal(
        <WhatsAppButtonContent />,
        portalElement
      )}
    </>
  );
};

export default WhatsAppFloatButton;