import { ReactComponent as UserCircle } from 'assets/icons/user.svg';
import React from 'react';
import { Button, Card } from 'shared/components/partials';
import ToggleSwitch from 'shared/components/partials/ToggleSwitch';
import BusinessEntityInfo from './BusinessEntity';
import IndividualInfo from './Individual';

const UserInfo = ({ isIndividual = false }) => {
  return (
    <Card>
      <div className='bg-primary text-white relative'>
        <div className='px-16 pt-12 pb-2'>
          <div className='text-lg font-semibold'>{isIndividual ? 'Individual User' : 'Business/Entity User'}</div>
          <div className='text-2.5'>Account Registered: 2022-03-31</div>
        </div>
        <div className='absolute top-10 right-12 text-8xl text-primary'>
          <div className='bg-white p-1 rounded-full drop-shadow-md'>
            <UserCircle />
          </div>
        </div>
      </div>

      <div className='px-16 py-16'>
        <div className='font-semibold'>
          KYC Status: <span className='text-success'>Verified</span>
        </div>
        {isIndividual ? <IndividualInfo /> : <BusinessEntityInfo />}
        <div className='border-t' />
        <div className='pt-5'>
          <h1 className='font-semibold text-sm'>Admin Tools</h1>
          <p className='text-[8px] mt-3'>Restrict User Account</p>
          <div className='flex gap-4 mb-5'>
            <ToggleSwitch />
            <p className='font-medium text-[8px]'>Unrestricted</p>
          </div>
          <Button size='sm' className='px-4'>
            Reset Password
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default UserInfo;
