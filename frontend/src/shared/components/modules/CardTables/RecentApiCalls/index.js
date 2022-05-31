import { ReactComponent as Buffer } from 'assets/icons/buffer.svg';
import React, { useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import RecentApiCallsTable from './table';

const RecentApiCalls = () => {
  const [params, setParams] = useState();
  const handleToolbarChange = (newParams) => {
    setParams(newParams);
  };

  return (
    <Card className='h-full'>
      <CardHeader icon={<Buffer />} title='Recent API Calls' />
      <CardBody>
        <div className='flex flex-col flex-1 min-h-0'>
          <Toolbar onChange={handleToolbarChange} />
          <div className='flex flex-col flex-1 min-h-0'>
            <RecentApiCallsTable externalParams={params} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default RecentApiCalls;
