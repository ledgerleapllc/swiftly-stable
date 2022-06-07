import { ReactComponent as Clipboard } from 'assets/icons/clipboard.svg';
import React, { useEffect, useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Card, CardBody, CardHeader, Input } from 'shared/components/partials';
import AllUserActivityTable from './table';

const AllUserActivity = (props) => {
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
      <CardHeader icon={<Clipboard />} title='All User Activity'>
        <Input className='bg-white w-64 py-1 px-2 text-3.25' placeholder='Search Activity' />
      </CardHeader>
      <CardBody>
        <div className='flex flex-col flex-1 min-h-0'>
          <Toolbar onChange={handleToolbarChange} hideSearch />
          <div className='flex flex-col flex-1 min-h-0'>
            <AllUserActivityTable externalParams={params} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default AllUserActivity;
