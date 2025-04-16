
import React, { useState, useEffect } from 'react';
import { Toast as ToastType } from '../../types';

interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(toast.id), 300); // Give time for animation before removing
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [toast.id, onClose]);

  const getToastClasses = () => {
    let classes = 'toast opacity-100 transition-opacity duration-300 ';
    
    if (!isVisible) {
      classes += 'opacity-0 ';
    }
    
    switch (toast.type) {
      case 'success':
        return classes + 'toast-success';
      case 'error':
        return classes + 'toast-error';
      case 'info':
        return classes + 'toast-info';
      case 'warning':
        return classes + 'toast-warning';
      default:
        return classes;
    }
  };

  return (
    <div className={getToastClasses()}>
      <div className="flex items-center justify-between w-full">
        <div className="text-sm font-normal">{toast.message}</div>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose(toast.id), 300);
          }}
        >
          <span className="sr-only">Close</span>
          <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
