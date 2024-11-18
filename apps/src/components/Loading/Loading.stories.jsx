// src/components/Loading/Loading.stories.jsx
import React from 'react';
import Loading from './index';

export default {
  title: 'Components/Loading',
  component: Loading,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'light'],
    },
    textPosition: {
      control: 'radio',
      options: ['bottom', 'right'],
    },
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
};

// 基础用法
export const Basic = {
  args: {
    size: 'medium',
    variant: 'primary',
  },
};

// 带文本
export const WithText = {
  args: {
    size: 'medium',
    variant: 'primary',
    text: '加载中...',
  },
};

// 不同尺寸
export const Sizes = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <Loading size="small" text="Small" />
      <Loading size="medium" text="Medium" />
      <Loading size="large" text="Large" />
    </div>
  ),
};

// 不同颜色
export const Variants = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      <Loading variant="primary" text="Primary" />
      <Loading variant="secondary" text="Secondary" />
      <Loading variant="success" text="Success" />
      <Loading variant="warning" text="Warning" />
      <Loading variant="danger" text="Danger" />
      <div className="p-4 bg-gray-800 rounded">
        <Loading variant="light" text="Light" />
      </div>
    </div>
  ),
};

// 文本位置
export const TextPositions = {
  args:{
    size:"large"
  },
  render:() => (
    <div className="flex flex-col gap-4">
      <Loading text="底部文本" textPosition="bottom" />
      <Loading text="右侧文本" textPosition="right" />
    </div>
  )
};

// 全屏加载
export const FullScreen = {
  args: {
    fullScreen: true,
    text: '加载中...',
    size: 'large',
  },
};