import React from 'react';
const LoadingSpinner = ({ size = 'medium', message = "" }) => {
  const sizes = {
    small: 'w-6 h-6 border-2',
    medium: 'w-12 h-12 border-[3px]',
    large: 'w-20 h-20 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className={`absolute inset-0 rounded-full border-indigo-500/10 ${sizes[size]}`}></div>
        
        <div 
          className={`
            animate-spin rounded-full 
            border-transparent border-t-indigo-500 border-r-indigo-500/30
            shadow-[0_0_15px_rgba(79,70,229,0.2)]
            ${sizes[size]}
          `}
        ></div>
      </div>

      {message && (
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-[0.3em] animate-pulse">
            {message}
          </span>
          <div className="flex space-x-1 mt-1">
            <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;