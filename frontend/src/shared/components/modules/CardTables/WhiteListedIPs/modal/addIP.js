import { ReactComponent as Add } from 'assets/icons/add.svg';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';
import { createIP } from 'stores/api/admin/actions';

const AddIPModal = ({ close, guid }) => {
  const [isCallingApi, setIsCallingApi] = useState();

  const [ip, setIP] = useState('');

  const dispatch = useDispatch();

  const handleChangeIP = (e) => {
    setIP(e.target.value);
  };

  const handleAddIP = () => {
    setIsCallingApi(true);
    dispatch(
      createIP(
        {
          ip,
          guid: guid,
        },
        () => {
          setIsCallingApi(false);
          close(true);
        },
        () => {
          setIsCallingApi(false);
          close();
        }
      )
    );
  };

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header>
        <div className='relative flex gap-4'>
          <div>
            <p className='text-4.25 font-semibold text-black1'>Add New IP</p>
            <p className='text-sm font-normal mt-1'>Enter the IP you wish to whitelist.</p>
          </div>
        </div>
      </Dialog.Header>
      <Dialog.Body className='pt-6.25'>
        <Input placeholder='IP address' onChange={handleChangeIP} />
      </Dialog.Body>
      <Dialog.Footer className='mt-6'>
        <Button className='w-full' color='success' disabled={!ip || isCallingApi} onClick={handleAddIP}>
          <Add className='mr-2 text-xs' />
          Whitelist this IP
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
};

export default AddIPModal;
