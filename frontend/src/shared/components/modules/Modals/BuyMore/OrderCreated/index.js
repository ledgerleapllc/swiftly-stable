import React from 'react';
import { Button, CopyButton } from 'shared/components/partials';

const OrderCreated = ({ selectedType, onConfirm }) => {
  return (
    <>
      {selectedType?.symbol === 'USD' ? (
        <>
          <div className='border-t mb-7.5' />
          <div>
            <h3 className='font-semibold pb-3'>Wire Details</h3>
            <div className='flex flex-col gap-2'>
              <p>Bank of America</p>
              <p>555 South Banking Blvd. Townsville, FL 32555</p>
              <p>
                Routing Number: <strong>987654321</strong>
              </p>
              <p>
                Account Number: <strong>5498651354986451</strong>
              </p>
              <p>
                Account Type: <strong>Business Checking</strong>
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className='flex flex-col gap-3'>
          <div className='flex'>
            <p>Send BTC to: </p>
            <div className='w-full flex items-center gap-x-4 text-sm font-semibold'>
              <textarea
                className='input-readonly-copy-text w-full text-center'
                id={`${selectedType?.symbol}-address`}
                value='0xab3B229eB4BcFF881275E7EA2F0FD24eeaC8C83a'
                readOnly
              />
              <CopyButton from={`${selectedType?.symbol}-address`} />
            </div>
          </div>
          <p>
            Amount Due:{' '}
            <strong>
              {selectedType?.amountDue} {selectedType?.symbol}
            </strong>
          </p>
        </div>
      )}
      <Button color='primary' className='w-full mt-8' onClick={() => onConfirm && onConfirm()}>
        Close
      </Button>
    </>
  );
};

export default OrderCreated;
