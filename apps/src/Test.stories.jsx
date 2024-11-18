import React from 'react';

const meta = {
  title: 'Test/Styles',
  component: () => null,
};

export default meta;

export const StyleTest = {
  render: () => (
    <div className="p-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Test Button
      </button>
    </div>
  )
};