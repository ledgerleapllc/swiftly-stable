import { ReactComponent as ArrowBracket } from 'assets/icons/arrow-bracket.svg';
import { ReactComponent as Key } from 'assets/icons/key.svg';
import React, { useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Button, Card, CardBody, CardHeader } from 'shared/components/partials';
import AllActivityTable from './table';

const AllActivity = () => {
  const [params, setParams] = useState();

  const handleToolbarChange = (params) => {
    setParams(params);
  };

  return (
    <Card className='h-full'>
      <CardHeader icon={<Key />} title='All Activity'>
        <Button size='sm' className='px-5'>
          <div className='flex gap-2 items-center py-1'>
            <ArrowBracket className='-rotate-90' />
            Make a Withdraw
          </div>
        </Button>
      </CardHeader>
      <CardBody>
        <div className='flex flex-col flex-1 min-h-0'>
          <Toolbar onChange={handleToolbarChange} />
          <div className='flex flex-col flex-1 min-h-0'>
            <AllActivityTable externalParams={params} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default AllActivity;
