import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Redirect timer
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Floating 404 Text */}
        <div className="relative">
          <h1 className="text-9xl font-extrabold text-blue-500 
            animate-bounce-slow opacity-20 
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            404
          </h1>
          <h2 className="text-4xl font-bold text-gray-800 relative z-10 
            animate-pulse-slow">
            Oops! Page Not Found
          </h2>
        </div>

        {/* Subtle Illustration */}
        <div className="flex justify-center items-center space-x-4 my-8">
          <div className="w-24 h-24 bg-blue-300 rounded-full 
            animate-spin-slow opacity-50"></div>
          <div className="w-16 h-16 bg-blue-400 rounded-full 
            animate-ping-slow opacity-75"></div>
        </div>

        {/* Error Description */}
        <p className="text-gray-600 mb-6 
          animate-fade-in">
          The page you're looking for seems to have wandered off into the digital wilderness.
        </p>

        {/* Redirect Information */}
        <div className="bg-white shadow-md rounded-lg p-4 
          animate-slide-up">
          <p className="text-gray-700">
            Redirecting to homepage in <span className="font-bold text-blue-600">{countdown}</span> seconds...
          </p>
        </div>

        {/* Manual Return Button */}
        <button 
          onClick={() => navigate('/')}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full 
          hover:bg-blue-600 transition duration-300 
          transform hover:scale-105 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;

// Add these custom animations to your tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       animation: {
//         'bounce-slow': 'bounce 2s infinite',
//         'pulse-slow': 'pulse 3s infinite',
//         'spin-slow': 'spin 4s linear infinite',
//         'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
//         'fade-in': 'fadeIn 1s ease-out',
//         'slide-up': 'slideUp 0.7s ease-out'
//       },
//       keyframes: {
//         fadeIn: {
//           '0%': { opacity: '0' },
//           '100%': { opacity: '1' }
//         },
//         slideUp: {
//           '0%': { transform: 'translateY(20px)', opacity: '0' },
//           '100%': { transform: 'translateY(0)', opacity: '1' }
//         }
//       }
//     }
//   }
// }