// src/components/Loading/index.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({
  size = 'medium',
  variant = 'primary',
  text = '',
  textPosition = 'bottom',
  fullScreen = false,
}) => {
  const sizeMap = {
    small: {
      spinner: 'w-4 h-4',
      text: 'text-sm',
    },
    medium: {
      spinner: 'w-8 h-8',
      text: 'text-base',
    },
    large: {
      spinner: 'w-12 h-12',
      text: 'text-lg',
    },
  };

  const variantMap = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600',
    light: 'text-white',
  };

  const spinnerClasses = `inline-block animate-spin ${sizeMap[size].spinner} ${variantMap[variant]}`;
  const textClasses = `${sizeMap[size].text} ${variantMap[variant]}`;

  const LoadingContent = () => (
    <div className={`flex ${textPosition === 'right' ? 'flex-row items-center gap-3' : 'flex-col items-center gap-2'}`}>
      <svg
        className={spinnerClasses}
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
      {text && <span className={textClasses}>{text}</span>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <LoadingContent />
      </div>
    );
  }

  return <LoadingContent />;
};

Loading.propTypes = {
  /** 尺寸大小 */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** 颜色变体 */
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'light']),
  /** 加载文本 */
  text: PropTypes.string,
  /** 文本位置 */
  textPosition: PropTypes.oneOf(['bottom', 'right']),
  /** 是否全屏显示 */
  fullScreen: PropTypes.bool,
};

export default Loading;