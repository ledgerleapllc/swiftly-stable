import { ReactComponent as ChevronLeft } from 'assets/icons/circle-chevron-left.svg';
import React, { useEffect, useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Card, CardBody, CardHeader, Input } from 'shared/components/partials';
import PendingRequestsTable from './table';

const PendingRequests = (props) => {
  const [params, setParams] = useState();

  const handleToolbarChange = (value) => {
    setParams({ ...params, ...value });
  };

  useEffect(() => {
    if (props.guid) {
      setParams({ ...params, guid: props.guid });
    }
  }, [props.guid]);

  return (
    <Card>
      <CardHeader icon={<ChevronLeft />} title='Pending'>
        <Input className='bg-white w-64 py-1 px-2 text-3.25' placeholder='Search My Pools' />
      </CardHeader>
      <CardBody>
        <div className='flex flex-col flex-1 min-h-0'>
          <Toolbar onChange={handleToolbarChange} hideSearch />
          <div className='flex flex-col flex-1 min-h-0'>
            <PendingRequestsTable externalParams={params} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default PendingRequests;
