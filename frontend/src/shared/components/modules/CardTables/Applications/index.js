import { ReactComponent as Clipboard } from 'assets/icons/clipboard.svg';
import React, { useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import ApplicationsTable from './table';

const Applications = () => {
  const [params, setParams] = useState();
  const handleToolbarChange = (params) => {
    setParams(params);
  };

  return (
    <>
      <Card className='h-full'>
        <CardHeader icon={<Clipboard />} title='New Applications' />
        <CardBody>
          <div className='flex flex-col h-full'>
            <Toolbar onChange={handleToolbarChange} />
            <div className='flex-1 min-h-0'>
              <ApplicationsTable externalParams={params} />
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default Applications;
