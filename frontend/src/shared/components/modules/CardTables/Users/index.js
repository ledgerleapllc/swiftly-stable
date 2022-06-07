import { ReactComponent as UsersGroup } from 'assets/icons/user-group.svg';
import React, { useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Card, CardBody, CardHeader, Input } from 'shared/components/partials';
import UsersTable from './table';

const Users = () => {
  const [params, setParams] = useState();
  const handleToolbarChange = (params) => {
    setParams(params);
  };

  return (
    <>
      <Card className='h-full'>
        <CardHeader icon={<UsersGroup />} title='Users'>
          <Input className='bg-white w-64 py-1 px-2 text-3.25' placeholder='Search Email, Name, Shufti RefID' />
        </CardHeader>
        <CardBody>
          <div className='flex flex-col h-full'>
            <Toolbar onChange={handleToolbarChange} hideSearch />
            <div className='flex-1 min-h-0'>
              <UsersTable externalParams={params} />
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default Users;
