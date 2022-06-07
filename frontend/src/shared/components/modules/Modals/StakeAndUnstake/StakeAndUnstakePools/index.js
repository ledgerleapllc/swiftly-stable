import classNames from 'classnames';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';

const StakeAndUnstakePools = ({ type, selectedPool, onSelect, onConfirm }) => {
  const [pools] = useState([
    {
      id: 1,
      name: 'P201',
      amount: '15,000',
    },
    {
      id: 2,
      name: 'P50',
      amount: '7,000',
    },
    {
      id: 3,
      name: 'P138',
      amount: '2,500',
    },
  ]);

  const handlePool = (pool) => {
    onSelect && onSelect(pool);
  };

  return (
    <>
      <Dialog.Body className='mt-7.5'>
        <div className='flex mt-7.5 gap-4'>
          {pools.map((pool, index) => (
            <div
              key={index}
              className={classNames('py-3 px-6 border-2 cursor-pointer', {
                'border-primary': pool.id === selectedPool?.id,
              })}
              onClick={() => handlePool(pool)}
            >
              <h5 className='font-semibold'>{pool.name}</h5>
              <p>My Stake: {pool.amount}</p>
            </div>
          ))}
        </div>
        <div className='border-t mt-2' />
      </Dialog.Body>
      <Dialog.Footer className='flex flex-col mt-4 gap-4'>
        <Button
          color='primary'
          className='w-full'
          disabled={!selectedPool?.id}
          onClick={() => onConfirm && onConfirm()}
        >
          Next
        </Button>
        {type === 'stake' && (
          <Link to='#' className='underline text-primary'>
            See all available pools
          </Link>
        )}
      </Dialog.Footer>
    </>
  );
};

export default StakeAndUnstakePools;
