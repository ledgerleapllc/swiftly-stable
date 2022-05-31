import React from 'react';
import { Button } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';
import { HistoryStatus } from 'shared/core/directive';
import { formatDate } from 'shared/core/utils';

const APICallsDetailModal = (props) => {
  const { close, data } = props;

  const handleCancel = () => {
    close();
  };

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header title='API Call Details' />
      <Dialog.Body className='mt-5 flex flex-col gap-y-1'>
        <div className='flex space-x-2'>
          <span>Timestamp:</span>
          <span className='font-semibold'>{formatDate(data.created_at)}</span>
        </div>
        <div className='flex space-x-2'>
          <span>IP From:</span>
          <span className='font-semibold'>{data.ip}</span>
        </div>
        <div className='flex space-x-2'>
          <span>CSPR Amount:</span>
          <span className='font-semibold'>{data.amount}</span>
        </div>
        <div className='flex space-x-2'>
          <span>Recipient:</span>
          <span className='font-semibold break-all'>{data.address}</span>
        </div>
        <div className='flex space-x-2 mt-4'>
          <span>Response Code:</span>
          <span className='font-semibold'><HistoryStatus data={data} /></span>
        </div>
        <div>
          <span>Deploy Hash:</span>
          <span>{data.deploy_hash}</span>
        </div>
      </Dialog.Body>
      <Dialog.Footer>
        <div className='mt-4'>
          <Button className='w-full' onClick={handleCancel}>
            Close
          </Button>
        </div>
      </Dialog.Footer>
    </Dialog>
  );
};

export default APICallsDetailModal;
