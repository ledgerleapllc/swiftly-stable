import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'shared/components/partials';
import classNames from 'classnames';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { ReactComponent as UserAlt } from 'assets/icons/user-alt.svg';
import { ReactComponent as Business } from 'assets/icons/business.svg';

const SignUp = () => {
  return (
    <div className={classNames('h-full w-full flex flex-col items-center justify-center')}>
      <div>
        <Logo className='w-1/3 mx-auto' />
        <div className='pt-6 h-full'>
          <div className='h-full flex flex-col'>
            <div className='pb-3 text-center'>
              <h3 className='font-semibold'>Welcome to SwiftlyStable!</h3>
              <p>Before you register, are you an individual or do you represent a business/entity?</p>
            </div>
            <div className='pt-7 -mx-12 flex-1 min-h-0 overflow-y-scroll'>
              <div className='max-w-md flex flex-col px-14 space-y-3 mx-auto'>
                <Button as={Link} to="/auth/signup/individual" className='w-full'>
                  <UserAlt className='mr-2'/>
                  Individual
                </Button>
                <Button as={Link} to="/auth/signup/entity" className='w-full'>
                  <Business className='mr-2'/>
                  Business/Entity
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
