import { ReactComponent as Key } from 'assets/icons/key.svg';
import React, { useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import MyApiKeysTable from './table';

const MyApiKeys = () => {
  const [params, setParams] = useState();

  const handleToolbarChange = (params) => {
    setParams(params);
  };

  return (
    <Card className='h-full'>
      <CardHeader icon={<Key />} title='My API Keys' />
      <CardBody>
        <div className='flex flex-col flex-1 min-h-0'>
          <Toolbar onChange={handleToolbarChange} />
          <div className='flex flex-col flex-1 min-h-0'>
            <MyApiKeysTable externalParams={params} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default MyApiKeys;
