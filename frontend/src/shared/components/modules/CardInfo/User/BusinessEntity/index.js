import { ReactComponent as Edit } from 'assets/icons/edit.svg';
import React from 'react';
import { Input } from 'shared/components/partials';

const BusinessEntityInfo = (props) => {
  return (
    <div className='py-6 flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <h1 className='font-semibold text-sm'>Entity Details</h1>
        <Edit />
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <Input placeholder='Best Investments LLC' label='Business Name' />
        <Input placeholder='+1 (585) 212-3612' label='Business Phone Number' />
        <Input placeholder='659-02015687' label='Registration Number' />
        <Input placeholder='2022-03-31' label='Phone Number' />
      </div>
      <h1 className='font-semibold text-sm'>Address Details</h1>
      <div className='grid grid-cols-2 gap-2'>
        <Input placeholder='101 South Ave.' label='Registered Entity Office Address' />
        <Input placeholder='106' label='Apartment, suite, etc.' />
        <Input placeholder='Orangeville' label='City' />
        <Input placeholder='California' label='State' />
        <Input placeholder='65145' label='Zip Code' />
        <Input placeholder='United States of America' label='Country/Region' />
      </div>
      <h1 className='font-semibold text-sm'>Contact Person Details</h1>
      <div className='grid grid-cols-2 gap-2'>
        <Input placeholder='Jason Stone' label='Authorized Contact Name' />
        <Input placeholder='CEO' label='Title' />
        <Input placeholder='jason@bestinvestments.com' label='Business Email Address' />
        <Input placeholder='+1 (585) 212-3612' label='Contact Person Phone Number' />
      </div>
    </div>
  );
};

export default BusinessEntityInfo;
