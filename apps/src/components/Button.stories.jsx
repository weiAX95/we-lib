import React from 'react';
import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'outline'],
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
  },
};

// 基础用法
export const Primary = {
  args: {
    variant: 'primary',
    label: 'Primary Button',
  },
};

// 不同变体展示
export const Variants = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="primary" label="Primary" />
      <Button variant="secondary" label="Secondary" />
      <Button variant="success" label="Success" />
      <Button variant="danger" label="Danger" />
      <Button variant="outline" label="Outline" />
    </div>
  ),
};

// 不同尺寸
export const Sizes = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="small" label="Small" />
      <Button size="medium" label="Medium" />
      <Button size="large" label="Large" />
    </div>
  ),
};

// 禁用状态
export const Disabled = {
  args: {
    label: 'Disabled Button',
    disabled: true,
  },
};

// 全宽按钮
export const FullWidth = {
  args: {
    label: 'Full Width Button',
    fullWidth: false,
  },
};