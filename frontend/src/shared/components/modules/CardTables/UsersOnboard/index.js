import { ReactComponent as Checkbox } from 'assets/icons/check-box.svg';
import { ReactComponent as Dashboard } from 'assets/icons/dashboard.svg';
import { ReactComponent as UnCheckbox } from 'assets/icons/uncheck-box.svg';
import React, { useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import UsersOnboardTable from './table';

const UsersOnboard = () => {
  const [params, setParams] = useState();
  const [selected, setSelected] = useState(false);

  const handleToolbarChange = (params) => {
    setParams(params);
  };

  return (
    <>
      <Card className='h-full'>
        <CardHeader icon={<Dashboard />} title='Allow new users access to their dashboard'>
          <button className='flex gap-2 items-center' onClick={() => setSelected(!selected)}>
            {selected ? <Checkbox /> : <UnCheckbox />}
            Show Archived
          </button>
        </CardHeader>
        <CardBody>
          <div className='flex flex-col h-full'>
            <Toolbar onChange={handleToolbarChange} hideSearch />
            <div className='flex-1 min-h-0'>
              <UsersOnboardTable externalParams={params} />
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default UsersOnboard;
