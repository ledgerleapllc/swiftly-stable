import React from 'react';
import { Button } from 'shared/components/partials';

const VerifyOrder = ({ selectedType, onConfirm }) => {
  return (
    <>
      <div className='border-t mb-7.5' />
      <div className='flex flex-col gap-3'>
        <p>
          You will purchase: <strong>{selectedType?.stablecoinAmount} stablecoin</strong>
        </p>
        <p>
          Amount Due:{' '}
          <strong>
            {selectedType?.amountDue} {selectedType?.symbol}
          </strong>
        </p>
      </div>
      <Button color='primary' className='w-full mt-8' onClick={() => onConfirm && onConfirm()}>
        Place Order
      </Button>
    </>
  );
};

export default VerifyOrder;
