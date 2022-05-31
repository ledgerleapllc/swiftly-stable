import { ReactComponent as Wallet } from 'assets/icons/wallet.svg';
import React, { forwardRef, useEffect, useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import WalletsHistoryTable from './table';

const WalletsHistory = forwardRef((props, ref) => {
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
      <CardHeader icon={<Wallet />} title='Wallet History' />
      <CardBody>
        <div className='flex flex-col flex-1 min-h-0'>
          <Toolbar onChange={handleToolbarChange} />
          <div className='flex flex-col flex-1 min-h-0'>
            <WalletsHistoryTable ref={ref} externalParams={params} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
});

export default WalletsHistory;
