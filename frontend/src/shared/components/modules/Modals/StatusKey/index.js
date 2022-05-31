import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';
import { disableAPIKey, enableAPIKey } from 'stores/api/admin/actions';

const StatusKeyModal = (props) => {
  const { close, disabled = false, apiKey } = props;
  const dispatch = useDispatch();

  const undo = () => {
    disabled
      ? dispatch(
          enableAPIKey(
            {
              api_key_id: apiKey.api_key_id,
            },
            (res) => {
              close('undo');
            }
          )
        )
      : dispatch(
          disableAPIKey(
            {
              api_key_id: apiKey.api_key_id,
            },
            (res) => {
              close('undo');
            }
          )
        );
    close();
  };

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header
        title='Success!'
        subTitle={`You ${disabled ? 'disabled' : `have re-activated`} ${apiKey.email}.`}
      />
      <Dialog.Footer>
        <Button className='w-full mt-6' color={disabled ? 'primary' : 'success'} onClick={close}>
          Close
        </Button>
        <div className='mt-10 text-center'>
          <Button variant='text' color={disabled ? 'success' : 'primary'} className='underline' onClick={undo}>
            {disabled ? 'Re-activate this user' : 'Disable this user'}
          </Button>
        </div>
      </Dialog.Footer>
    </Dialog>
  );
};

export default StatusKeyModal;
