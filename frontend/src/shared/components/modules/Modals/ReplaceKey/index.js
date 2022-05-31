import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';
import { replaceKey } from 'stores/api/shared/actions';

const ReplaceKeyModal = ({ close, guid, onUpdate }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    close();
  };

  const handleReplaceKey = () => {
    setLoading(true);
    dispatch(
      replaceKey(
        { guid },
        (res) => {
          onUpdate && onUpdate(res);
          close();
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header
        title='Replace Key'
        subTitle='This action will replace your existing key with a new one. Please confirm or cancel this action. This
              action can not be undone.'
      />
      <Dialog.Footer>
        <Button className='w-full mt-6' color='primary' onClick={handleReplaceKey} disabled={loading}>
          Replace Key
        </Button>
        <div className='mt-2.5 text-center'>
          <Button variant='text' className='underline' onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Dialog.Footer>
    </Dialog>
  );
};

export default ReplaceKeyModal;
