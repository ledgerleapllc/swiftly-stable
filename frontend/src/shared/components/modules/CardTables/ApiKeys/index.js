import React, { useState } from 'react';
import { ReactComponent as Key } from 'assets/icons/key.svg';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import ApiKeysTable from './table';
import Toolbar from 'shared/components/modules/Toolbar';

const ApiKeys = () => {
  const [params, setParams] = useState();
  const handleToolbarChange = (params) => {
    setParams(params);
  };

  return (
    <Card className='h-full'>
      <CardHeader icon={<Key />} title='API KeyHolders' />
      <CardBody>
        <div className='flex flex-col h-full'>
          <Toolbar onChange={handleToolbarChange}/>
          <div className='flex-1 min-h-0'>
            <ApiKeysTable externalParams={params} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ApiKeys;
