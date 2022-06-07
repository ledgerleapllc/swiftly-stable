import React from 'react';
import { Button } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';

const AskKYC = ({ onConfirm }) => {
  return (
    <>
      <Dialog.Body className='mt-7.5'></Dialog.Body>
      <Dialog.Footer className='flex mt-4 justify-between gap-4'>
        <Button color='success' className='w-full' onClick={onConfirm}>
          Yes
        </Button>
        <Button className='w-full'>No</Button>
      </Dialog.Footer>
    </>
  );
};

AskKYC.propTypes = {};

export default AskKYC;
