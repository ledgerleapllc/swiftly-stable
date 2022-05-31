import React from 'react';
import { Button } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';

const ViewModal = (props) => {
  const {
    close,
    application: { description },
  } = props;

  const handleClose = () => {
    close();
  };

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header title='Reason for CSPR' />
      <Dialog.Body>
        <p className='text-sm font-normal'>{description}</p>
      </Dialog.Body>
      <Dialog.Footer className='mt-6'>
        <Button className='w-full' onClick={handleClose}>
          Ok
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
};

export default ViewModal;
