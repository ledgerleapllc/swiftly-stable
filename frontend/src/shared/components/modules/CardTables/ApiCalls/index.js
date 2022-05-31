import { ReactComponent as Buffer } from 'assets/icons/buffer.svg';
import React, { useEffect, useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import ApiCallsTable from './table';

const ApiCalls = (props) => {
  const [params, setParams] = useState();

  const handleToolbarChange = (value) => {
    setParams({ ...params, ...value });
  };

  useEffect(() => {
    if (props.guid) {
      setParams({ ...params, guid: props.guid });
    }
  }, [props.guid])

  return (
    <Card className={props.className || ''}>
      <CardHeader icon={<Buffer />} title='API Calls' />
      <CardBody>
        <div className='flex flex-col flex-1 min-h-0'>
          <Toolbar onChange={handleToolbarChange} />
          <div className='flex flex-col flex-1 min-h-0'>
            <ApiCallsTable externalParams={params} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ApiCalls;
