import React from 'react';
import { ReactComponent as HourGlass} from 'assets/icons/hourglass.svg';
import { Button } from 'shared/components/partials';
import { Link } from 'react-router-dom';

const Review = (props) => {
  return (
    <div className='h-screen w-screen flex justify-center items-center flex-col'>
      <div className='w-4/12 text-center mx-auto'>
        <HourGlass className='mx-auto' />
        <p className='text-4.25 font-semibold'>Your application is still under review!</p>
        <p className='whitespace-normal text-sm mt-1'>
          Your application for Swiftly Stable will be reviewed by one of our admins! If accepted, you will receive an email explaining next steps.
        </p>
        <Button className='mt-10' as={Link} to='/auth/login'>
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default Review;
