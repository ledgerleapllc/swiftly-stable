import React from 'react';
import AvailablePool from 'shared/components/modules/CardInfo/AvailablePool';
import MyPool from 'shared/components/modules/CardInfo/MyPool';
import { Input } from 'shared/components/partials';

const YieldPoolsPage = () => {
  return (
    <div className='px-3 py-4'>
      <section>
        <div className='flex justify-between items-center'>
          <h1 className='font-medium text-4.25'>My Pools</h1>
          <Input className='bg-white w-64 py-1 px-2 text-3.25' placeholder='Search My Pools' />
        </div>

        <div className='grid grid-cols-4 gap-4 mt-3'>
          {Array.from({ length: 8 }).map((_, i) => (
            <MyPool key={i} />
          ))}
        </div>
      </section>
      <div className='border-t my-12.5'></div>
      <section>
        <div className='flex justify-between items-center'>
          <h1 className='font-medium text-4.25'>Available Pools</h1>
          <div className='flex gap-3'>
            <div className='flex items-center gap-x-1'>
              <p className='font-light text-3.25'>Sort By:</p>
              <select className='outline outline-1 py-1 px-3 font-light text-3.25' value={1}>
                <option value={1}>Pool Number</option>
                <option value={2}>{2}</option>
                <option value={3}>{3}</option>
              </select>
            </div>
            <Input className='bg-white w-64 py-1 px-2 text-3.25' placeholder='Search Available Pools' />
          </div>
        </div>
        <div className='grid grid-cols-5 gap-4 mt-3'>
          {Array.from({ length: 10 }).map((_, i) => (
            <AvailablePool key={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default YieldPoolsPage;
