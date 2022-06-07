import { ReactComponent as ArrowUp } from 'assets/icons/arrow-up.svg';
import React from 'react';
import { Button, Card } from 'shared/components/partials';

const AvailablePool = () => {
  return (
    <Card className='px-3 py-2'>
      <p className='text-right font-medium text-2.5'>P01</p>
      <div className='px-6 mt-6'>
        <div>
          <h1 className='text-4xl text-primary'>8%</h1>
          <p className='text-primary'>Annualized Yield</p>
        </div>

        <div className='font-light text-3.25 flex gap-1.25 flex-col'>
          <div>-</div>
          <div>
            Lockup Period: <strong className='font-medium'>1 Year</strong>
          </div>
          <div>
            Minimum Stake: <strong className='font-medium'>10,000</strong>
          </div>
        </div>
      </div>
      <div className='px-6 my-6'>
        <Button size='sm' className='w-full'>
          <div className='flex gap-1 items-center py-2'>
            <ArrowUp />
            Stake Now
          </div>
        </Button>
      </div>
    </Card>
  );
};

export default AvailablePool;
