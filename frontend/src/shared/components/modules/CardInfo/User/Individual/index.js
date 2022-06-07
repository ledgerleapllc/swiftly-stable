import { ReactComponent as Edit } from 'assets/icons/edit.svg';
import React from 'react';
import { Input } from 'shared/components/partials';

const IndividualInfo = (props) => {
  return (
    <div className='py-6 flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <h1 className='font-semibold text-sm'>User Details</h1>
        <Edit />
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <Input placeholder='Jason' label='First Name' />
        <Input placeholder='Stone' label='Last Name' />
        <Input placeholder='jason@gmail.com' label='Email Address' />
        <Input placeholder='+1 (585) 212-3612' label='Phone Number' />
      </div>
      <h1 className='font-semibold text-sm'>Address Details</h1>
      <div className='grid grid-cols-2 gap-2'>
        <Input placeholder='101 South Ave.' label='Address' />
        <Input placeholder='106' label='Apartment, suite, etc.' />
        <Input placeholder='Orangeville' label='City' />
        <Input placeholder='California' label='State' />
        <Input placeholder='65145' label='Zip Code' />
        <Input placeholder='United States of America' label='Country/Region' />
        <Input placeholder='United States' label='Country of Citizenship' />
      </div>
    </div>
  );
};

export default IndividualInfo;
