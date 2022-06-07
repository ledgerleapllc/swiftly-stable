import { ReactComponent as Clipboard } from 'assets/icons/clipboard.svg';
import React, { useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import UsersTable from './table';

const UsersInPool = () => {
  const [params, setParams] = useState();
  const handleToolbarChange = (params) => {
    setParams(params);
  };

  return (
    <>
      <Card className='h-full'>
        <CardHeader icon={<Clipboard />} title='Users in Pool' />
        <CardBody>
          <div className='flex flex-col h-full'>
            <Toolbar onChange={handleToolbarChange} hideSearch />
            <div className='flex-1 min-h-0'>
              <UsersTable externalParams={params} />
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default UsersInPool;
