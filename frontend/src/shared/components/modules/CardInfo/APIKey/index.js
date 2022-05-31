import { ReactComponent as Key } from 'assets/icons/key.svg';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, CardBody, CardHeader, CopyButton } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import { getGuid } from 'shared/core/services/auth';
import { getLimits } from 'stores/api/shared/actions';
import ReplaceKeyModal from '../../Modals/ReplaceKey';

const APIKeyInfo = ({ data }) => {
  const [limit, setLimit] = useState('');
  const { appendDialog } = useDialog();
  const dispatch = useDispatch();

  const apiKey = data;

  useEffect(() => {
    dispatch(
      getLimits({ guid: getGuid() }, (res) => {
        setLimit(res.detail);
      })
    );
  }, []);

  const handleUpdate = (apikey) => {
    apiKey.api_key = apikey;
  };

  const handleOpenModal = () => {
    appendDialog(<ReplaceKeyModal onUpdate={handleUpdate} />);
  };

  return (
    <Card className='w-1/2 max-w-lg h-60'>
      <CardHeader icon={<Key />} title='API Key'>
        <div className='flex gap-x-5'>
          <p>
            TX Limit: <b className='text-primary'>{limit?.per_limit}</b>
          </p>
          <p>
            Daily Limit: <b className='text-primary'>{limit?.day_limit}</b>
          </p>
        </div>
      </CardHeader>
      <CardBody className='flex flex-col justify-center items-center'>
        <div className='w-full flex items-center gap-x-4 text-sm font-semibold'>
          <textarea
            className='input-readonly-copy-text w-full text-center'
            id='api-key-id'
            value={apiKey?.api_key}
            readOnly
          />
          <CopyButton from='api-key-id' />
        </div>
        <Button size='sm' rounded className='mt-3' onClick={handleOpenModal}>
          Replace Key
        </Button>
      </CardBody>
    </Card>
  );
};

APIKeyInfo.propTypes = {};

export default APIKeyInfo;
