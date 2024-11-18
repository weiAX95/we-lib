import React from "react";
import Modal from './index';
import Button from '../Button';

export default {
 title: 'Components/Modal',
 component: Modal,
 tags: ['autodocs'],
};

export const Basic = {
 args: {
   title: '基础对话框',
   visible: true,
   children: (
     <div>
       <p>这是一个基础对话框的内容</p>
       <div className="mt-4 flex justify-end gap-2">
         <Button variant="outline" label="取消" />
         <Button variant="primary" label="确定" />
       </div>
     </div>
   ),
 },
};

export const Sizes = () => {
    const [visibleModal, setVisibleModal] = React.useState(null);
  
    return (
      <div>
        <div className="space-y-4">
          {['small', 'medium', 'large'].map((size) => (
            <Button
              key={size}
              label={`${size} Modal`}
              onClick={() => setVisibleModal(size)}
            />
          ))}
        </div>
        
        {['small', 'medium', 'large'].map((size) => (
          <Modal
            key={size}
            visible={visibleModal === size}
            title={`${size} Modal`}
            size={size}
            onClose={() => setVisibleModal(null)}
          >
            <div>
              <p>This is a {size} modal</p>
              <div className="mt-4 flex justify-end">
                <Button label="Close" onClick={() => setVisibleModal(null)} />
              </div>
            </div>
          </Modal>
        ))}
      </div>
    );
  };