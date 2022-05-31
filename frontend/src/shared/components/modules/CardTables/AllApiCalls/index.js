import { ReactComponent as Buffer } from 'assets/icons/buffer.svg';
import React, { useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import CheckBox from 'shared/components/partials/CheckBox';
import AllApiCallsTable from './table';

const AllApiCalls = () => {
  const [params, setParams] = useState();

  const handleToolbarChange = (params) => {
    setParams(params);
  };

  const handleCheckboxChange = (e) => {
    setParams({ ...params, only_delivered: e.target.checked });
  };

  return (
    <Card className='h-full'>
      <CardHeader icon={<Buffer />} title='All API Calls'>
        <div className='flex gap-x-2 items-center'>
          <CheckBox onChange={handleCheckboxChange}/>
          <p>Only Show Delivered</p>
        </div>
      </CardHeader>
      <CardBody>
        <div className='flex flex-col flex-1 min-h-0'>
          <Toolbar onChange={handleToolbarChange} />
          <div className='flex flex-col flex-1 min-h-0'>
            <AllApiCallsTable externalParams={params} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default AllApiCalls;
