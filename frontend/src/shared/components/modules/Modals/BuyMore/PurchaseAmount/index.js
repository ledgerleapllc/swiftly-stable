import React, { useState } from 'react';
import { Button, Input } from 'shared/components/partials';
import { calcStablecoinRate } from 'shared/core/utils';

const PurchaseAmount = ({ selectedType, onConfirm }) => {
  const [stablecoinAmount, setStablecoinAmount] = useState('');

  const handleAmountChange = (e) => {
    setStablecoinAmount(e.target.value);
  };

  return (
    <>
      <div className='grid grid-cols-2 gap-4 items-center'>
        <Input type='number' placeholder='Stablecoin Purchase Amount' onChange={handleAmountChange} />
        <p>
          = {calcStablecoinRate(stablecoinAmount, selectedType?.price)} {selectedType?.symbol}
        </p>
      </div>
      <Button
        color='primary'
        className='w-full mt-8'
        disabled={!stablecoinAmount}
        onClick={() => onConfirm && onConfirm(stablecoinAmount)}
      >
        Review Order
      </Button>
    </>
  );
};

export default PurchaseAmount;
