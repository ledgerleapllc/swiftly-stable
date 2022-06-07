import { ReactComponent as Checkbox } from 'assets/icons/check-box.svg';
import { ReactComponent as Add } from 'assets/icons/add.svg';
import { ReactComponent as Hexagon } from 'assets/icons/hexagon.svg';
import { ReactComponent as UnCheckbox } from 'assets/icons/uncheck-box.svg';
import React, { useEffect, useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Button, Card, CardBody, CardHeader, Input } from 'shared/components/partials';
import AllYieldPoolsTable from './table';
import AddPoolModal from './modal/add';
import { useDialog } from 'shared/components/partials/Dialog/Provider';

const AllYieldPools = (props) => {
  const [params, setParams] = useState();
  const [selected, setSelected] = useState(false);

  const { appendDialog } = useDialog();

  const handleToolbarChange = (value) => {
    setParams({ ...params, ...value });
  };

  useEffect(() => {
    if (props.guid) {
      setParams({ ...params, guid: props.guid });
    }
  }, [props.guid]);

  const handleAddPool = () => {
    appendDialog(<AddPoolModal />);
  };

  return (
    <Card>
      <CardHeader icon={<Hexagon />} title='All Yield Pools'>
        <div className='flex gap-4 items-center'>
          <button className='flex gap-2 items-center' onClick={() => setSelected(!selected)}>
            {selected ? <Checkbox /> : <UnCheckbox />}
            Show Archived
          </button>
          <Input className='bg-white w-64 py-1 px-2 text-3.25' placeholder='Search Activity' />
          <Button variant='text' onClick={handleAddPool}>
            <Add />
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className='flex flex-col flex-1 min-h-0'>
          <Toolbar onChange={handleToolbarChange} hideSearch />
          <div className='flex flex-col flex-1 min-h-0'>
            <AllYieldPoolsTable externalParams={params} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default AllYieldPools;
