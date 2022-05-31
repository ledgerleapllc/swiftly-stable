import React from 'react';
import { ReactComponent as Check } from 'assets/icons/check.svg';
import { useDispatch } from 'react-redux';
import { useLoading } from 'shared/components/modules/Loading';
import { Button } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';
import { approveUser } from 'stores/api/admin/actions';
import { toast } from 'react-toastify';

const ApproveModal = (props) => {
  const { close, application, onApprove } = props;

  const { guid, email } = application;

  const { setLoading } = useLoading();
  const dispatch = useDispatch();

  const handleApprove = () => {
    setLoading(true);
    dispatch(
      approveUser(
        { guid },
        () => {
          setLoading(false);
          onApprove && onApprove(guid);
          close();
          toast.success(`You approved ${email}`);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const handleCancel = () => {
    close();
  };
  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header
        title='Grant this user an API Key'
        subTitle='Confirm that you want to grant this user and API key.'
      >
        <Check className='absolute top-1 -left-8' />
      </Dialog.Header>
      <Dialog.Body></Dialog.Body>
      <Dialog.Footer className=''>
        <Button className='w-full mt-6' color='success' onClick={handleApprove}>
          Approve API Key
        </Button>
        <Button className='w-full mt-5' color='primary' onClick={handleCancel}>
          Cancel
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
};

export default ApproveModal;
