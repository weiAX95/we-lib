import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({
 visible = false,
 title,
 children,
 onClose,
 size = 'medium',
 closeOnOverlayClick = true
}) => {
 if (!visible) return null;

 const sizeClasses = {
   small: 'max-w-md',
   medium: 'max-w-lg',
   large: 'max-w-2xl'
 };

 const handleOverlayClick = (e) => {
   if (e.target === e.currentTarget && closeOnOverlayClick) {
     onClose();
   }
 };

 return (
   <div 
     className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
     onClick={handleOverlayClick}
   >
     <div className={`relative bg-white rounded-lg shadow-xl ${sizeClasses[size]} w-full m-4`}>
       <div className="flex items-center justify-between p-4 border-b">
         <h3 className="text-lg font-medium">{title}</h3>
         <button
           onClick={onClose}
           className="text-gray-400 hover:text-gray-500 focus:outline-none"
         >
           <span className="sr-only">Close</span>
           <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
           </svg>
         </button>
       </div>
       <div className="p-4">{children}</div>
     </div>
   </div>
 );
};

Modal.propTypes = {
 visible: PropTypes.bool,
 title: PropTypes.string.isRequired,
 children: PropTypes.node,
 onClose: PropTypes.func.isRequired,
 size: PropTypes.oneOf(['small', 'medium', 'large']),
 closeOnOverlayClick: PropTypes.bool
};

export default Modal;
