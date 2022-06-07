import React, { useState } from 'react';
import { Button, Input } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';

const StakeAndUnstakeAmount = ({ type, onConfirm }) => {
  const [amount, setAmount] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleStack = () => {
    onConfirm && onConfirm(amount);
  };

  return (
    <>
      <Dialog.Body className='mt-7.5'>
        <Input
          className='w-2/4'
          placeholder={type === 'stake' ? 'Stack Amount' : 'Unstake amount'}
          onChange={handleAmountChange}
        />
        <p className='pt-2'>
          {type === 'stake' ? 'Available Unstaked' : 'Total in pool'}: <strong>5,000</strong>
        </p>
      </Dialog.Body>
      <Dialog.Footer className='mt-8'>
        <Button color='primary' className='w-full' disabled={!amount} onClick={handleStack}>
          {type === 'stake' ? 'Stack' : 'Unstake'}
        </Button>
      </Dialog.Footer>
    </>
  );
};

export default StakeAndUnstakeAmount;
