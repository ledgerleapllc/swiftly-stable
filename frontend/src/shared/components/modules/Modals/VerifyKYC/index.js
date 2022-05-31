import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Button } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';

const VerifyKYC = ({ close, showLogo = true }) => {
  const [step, setStep] = useState(1);

  const handleCancel = () => {
    close();
  };

  return (
    <Dialog className='py-7.5 px-12.5 min-w-207' showCloseBtn={false} close={close}>
      {showLogo && <Logo className='w-1/3 mx-auto' />}
      <Dialog.Header
        className='flex justify-between'
        title='Verification Profile'
        subTitle='Do you represent an entity such as a company, trust, llc, non-profit, or another type of organization?'
      >
        <div className='flex gap-1 mr-1'>
          <div
            className={classNames(
              `transition ease-in-out border-solid w-2 h-2 rounded cursor-pointer ${
                step === 1 ? 'bg-primary' : 'bg-gray2'
              }`
            )}
          ></div>
          <div
            className={classNames(
              `transition ease-in-out border-solid w-2 h-2 rounded cursor-pointer ${
                step === 2 ? 'bg-primary' : 'bg-gray2'
              }`
            )}
          ></div>
        </div>
      </Dialog.Header>
      <Dialog.Body className='mt-7.5'></Dialog.Body>
      <Dialog.Footer className='flex mt-4 justify-between gap-4'>
        <Button color='success' className='w-full'>
          Yes
        </Button>
        <Button className='w-full'>No</Button>
      </Dialog.Footer>
    </Dialog>
  );
};

export default VerifyKYC;
