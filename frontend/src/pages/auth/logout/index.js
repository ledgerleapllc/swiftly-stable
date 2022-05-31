import React from 'react';
import LogoutSrc from 'assets/images/logout.png';
import { Button } from 'shared/components/partials';
import { Link } from 'react-router-dom';

const Logout = (props) => {
  return (
    <div className='h-screen w-screen flex justify-center items-center flex-col'>
      <div className='w-4/12 text-center mx-auto'>
        <img className='mx-auto' src={LogoutSrc} alt='Logout' />
        <p className='text-4.25 font-semibold'>You are now logged out!</p>
        <p className='whitespace-normal text-sm mt-1'>See you next time.</p>
        <Button className='mt-10' as={Link} to='/auth/login'>
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default Logout;
