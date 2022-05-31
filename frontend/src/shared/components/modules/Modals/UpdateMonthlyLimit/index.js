import Logo from 'assets/images/casper-logo.png';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';
import { updateLimits } from 'stores/api/shared/actions';
import { useLoading } from '../../Loading';

const UpdateMonthlyCSPRLimitModal = ({ close, guid, currentLimit, onUpdate }) => {
  const { setLoading } = useLoading();
  const [limit, setLimit] = useState('');

  const dispatch = useDispatch();

  const handleUpdateMonthlyLimit = () => {
    setLoading(true);
    dispatch(
      updateLimits(
        { guid, month_limit: limit },
        () => {
          onUpdate &&
            onUpdate({
              month_limit: limit,
            });
          setLoading(false);
          handleCancel();
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

  const handleMonthlyLimitChange = (e) => {
    setLimit(e.target.value);
  };

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header
        title='Update Monthly CSPR Limit'
        subTitle='This action will update the max CSPR that can be sent each day.'
      />
      <Dialog.Body className='pt-6.25'>
        <Input type='number' value={limit} placeholder='Monthly Limit' onChange={handleMonthlyLimitChange} />
        <p className='mt-2.5 flex'>
          Current Monthly Limit: <img className='ml-2 mr-1 w-4' src={Logo} alt='logo' />
          <b>{currentLimit}</b>
        </p>
      </Dialog.Body>
      <Dialog.Footer>
        <Button className='w-full mt-6' color='primary' onClick={handleUpdateMonthlyLimit} disabled={!limit}>
          Update Monthly Limit
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

export default UpdateMonthlyCSPRLimitModal;
