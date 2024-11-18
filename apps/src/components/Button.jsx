// src/components/Button.jsx
import PropTypes from 'prop-types';
import  React from 'react';
const Button = ({
  label,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  loading = false,
  type = 'button',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  };

  const sizeStyles = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const getButtonClasses = () => {
    return [
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth ? 'w-full' : '',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      className,
    ].join(' ');
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {label}
        </>
      );
    }

    if (icon) {
      return (
        <>
          {iconPosition === 'left' && <span className="mr-2">{icon}</span>}
          {label}
          {iconPosition === 'right' && <span className="ml-2">{icon}</span>}
        </>
      );
    }

    return label;
  };

  return (
    <button
      type={type}
      className={getButtonClasses()}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {renderContent()}
    </button>
  );
};

Button.propTypes = {
  /** 按钮文字 */
  label: PropTypes.string.isRequired,
  /** 点击事件处理函数 */
  onClick: PropTypes.func,
  /** 按钮变体样式 */
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'outline', 'ghost']),
  /** 按钮大小 */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** 是否禁用 */
  disabled: PropTypes.bool,
  /** 是否占满容器宽度 */
  fullWidth: PropTypes.bool,
  /** 按钮图标 */
  icon: PropTypes.node,
  /** 图标位置 */
  iconPosition: PropTypes.oneOf(['left', 'right']),
  /** 加载状态 */
  loading: PropTypes.bool,
  /** 按钮类型 */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** 自定义类名 */
  className: PropTypes.string,
};

export default Button;