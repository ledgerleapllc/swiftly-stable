import { ReactComponent as Wallet } from 'assets/icons/wallet.svg';
import React, { useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import MyWalletsTable from './table';

const MyWallets = React.forwardRef((_params, ref) => {
  const [params, setParams] = useState();

  const handleToolbarChange = (params) => {
    setParams(params);
  };

  return (
    <Card className='h-full'>
      <CardHeader icon={<Wallet />} title='My Wallets' />
      <CardBody>
        <div className='flex flex-col flex-1 min-h-0'>
          <Toolbar onChange={handleToolbarChange} />
          <div className='flex flex-col flex-1 min-h-0'>
            <MyWalletsTable ref={ref} externalParams={params} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
});

export default MyWallets;
