import { ReactComponent as ArrowDown } from 'assets/icons/arrow-down.svg';
import { ReactComponent as ArrowUp } from 'assets/icons/arrow-up.svg';
import { ReactComponent as Lock } from 'assets/icons/lock.svg';
import React from 'react';
import { Button, Card } from 'shared/components/partials';

const MyPool = ({ pool }) => {
  return (
    <Card className='px-3 py-2'>
      <div className='flex justify-end font-light text-2.5'>
        <div className='flex items-center gap-1'>
          <Lock />
          06/15/2025
        </div>
      </div>
      <div className='px-6 mt-6.25'>
        <h1 className='text-4xl mb-3'>P201</h1>
        <div className='font-light text-3.25 flex gap-1.25 flex-col'>
          <div>
            Annualized Yield: <strong className='font-medium'>8%</strong>
          </div>
          <div>
            Lockup Period: <strong className='font-medium'>1 Year</strong>
          </div>
          <div>
            Minimum Stake: <strong className='font-medium'>10,000</strong>
          </div>
        </div>
      </div>
      <div className='border-t my-5' />
      <div className='px-6 mb-6.25'>
        <p className='font-light text-3.25'>
          My Stake: <strong className='font-medium'>36,000</strong>
        </p>
        <div className='mt-4 flex gap-4 w-full'>
          <Button size='sm' className='w-full'>
            <div className='flex flex-col justify-center items-center py-2'>
              <ArrowUp />
              Stake More
            </div>
          </Button>
          <Button size='sm' variant='outline' className='w-full'>
            <div className='flex flex-col justify-center items-center'>
              <ArrowDown />
              Unstake
            </div>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MyPool;
