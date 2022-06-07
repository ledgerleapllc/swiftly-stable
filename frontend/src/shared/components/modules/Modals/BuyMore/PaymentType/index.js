import classNames from 'classnames';
import React, { useState } from 'react';
import { Button } from 'shared/components/partials';

const PaymentType = ({ selectedType, onSelected, onConfirm }) => {
  const [types] = useState([
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 30000,
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      price: 2000,
    },
    {
      id: 3,
      name: 'Bank Wire',
      symbol: 'USD',
      price: 1,
    },
  ]);

  const handleSelectType = (type) => {
    onSelected && onSelected(type);
  };

  return (
    <>
      <div>
        <div className='flex gap-4'>
          {types.map((type, index) => (
            <button
              key={index}
              className={classNames('py-5 px-[51px] border-2', {
                'border-primary': type.id === selectedType?.id,
              })}
              onClick={() => handleSelectType(type)}
            >
              <h5 className='font-semibold'>{type.name}</h5>
            </button>
          ))}
        </div>
        <div className='border-t mt-2.5 mb-6.25' />
        <Button
          color='primary'
          className='w-full'
          disabled={!selectedType?.id}
          onClick={() => onConfirm && onConfirm()}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default PaymentType;
