import { ReactComponent as Hexagon } from 'assets/icons/hexagon.svg';
import React, { useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import YieldPoolsTable from './table';

const YieldPools = () => {
  const [params, setParams] = useState();
  const handleToolbarChange = (params) => {
    setParams(params);
  };

  return (
    <>
      <Card className='h-full'>
        <CardHeader icon={<Hexagon />} title='Yield Pools' />
        <CardBody>
          <div className='flex flex-col h-full'>
            <Toolbar onChange={handleToolbarChange} hideSearch />
            <div className='flex-1 min-h-0'>
              <YieldPoolsTable externalParams={params} />
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default YieldPools;
