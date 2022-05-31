import { ReactComponent as Close } from 'assets/icons/close.svg';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useLoading } from 'shared/components/modules/Loading';
import { Button, Input } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';
import { denyUser } from 'stores/api/admin/actions';

const DenyModal = (props) => {
  const { close, application, onDeny } = props;

  const { guid, email } = application;

  const { setLoading } = useLoading();
  const dispatch = useDispatch();
  const [denyReason, setDenyReason] = useState();

  const handleDeny = () => {
    console.log(denyReason);
    setLoading(true);
    dispatch(
      denyUser(
        { guid, deny_reason: denyReason },
        () => {
          setLoading(false);
          onDeny && onDeny(guid);
          close();
          toast(`You denied ${email}`);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header title='Deny this user an API Key' subTitle='Enter your reason below.'>
        <Close className='absolute top-1 -left-8' color='red' />
      </Dialog.Header>
      <Dialog.Body className='mt-6'>
        <Input rows={4} value={denyReason} onChange={(e) => setDenyReason(e.target.value)} maxLength="2048" placeholder='Enter reason....' />
      </Dialog.Body>
      <Dialog.Footer className='mt-5'>
        <Button className='w-full' onClick={handleDeny}>
          Deny this user
        </Button>
        <Button variant='text' color='primary' className='text-sm mt-4 text-primary cursor-pointer' onClick={close}>
          Back
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
};

export default DenyModal;
