
import React from 'react';
import AddToCartForm from './AddToCartForm';
import CodeSnippet from './../../layouts/CodeSnippet';
import { CODE_SNIPPETS } from './../../assets/CodeSnippets';

const ActionStateExample: React.FC = () => {
  return (
    <div className="relative mx-8 mt-6">
      <div className='bg-[#1B1D25] rounded-2xl py-6 px-2'>
        <AddToCartForm
          itemID='1'
          itemTitle='JavaScript: The Good Parts'
        />
        <AddToCartForm
          itemID='2'
          itemTitle='5000 V-Bucks Gift Card'
        />
      </div>
      
      <CodeSnippet string={CODE_SNIPPETS.UseActionStateExample} />
    </div>
  );
};

export { ActionStateExample as UseActionStateExample };