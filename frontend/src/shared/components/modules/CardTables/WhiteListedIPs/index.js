import { ReactComponent as AddIcon } from 'assets/icons/add.svg';
import { ReactComponent as ListCheck } from 'assets/icons/list-check.svg';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Toolbar from 'shared/components/modules/Toolbar';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import AddIPModal from './modal/addIP';
import WhiteListedIPTable from './table';

const WhiteListedIP = () => {
  const [params, setParams] = useState();
  const { appendDialog } = useDialog();
  const { id } = useParams();
  const ref = useRef();

  useEffect(() => {
    if (id) {
      setParams({ ...params, guid: id });
    }
  }, [id]);

  const handleToolbarChange = (params) => {
    setParams(params);
  };

  const handleAddNewIP = () => {
    appendDialog(<AddIPModal guid={id} afterClosed={() => ref.current.refresh()} />);
  };

  return (
    <Card className='max-h-120'>
      <CardHeader icon={<ListCheck />} title='Whitelisted IPs'>
        <div className='flex gap-x-1 items-center text-sm cursor-pointer' onClick={handleAddNewIP}>
          <AddIcon />
          Add New IP
        </div>
      </CardHeader>
      <CardBody>
        <div className='flex flex-col flex-1 min-h-0'>
          <Toolbar onChange={handleToolbarChange} />
          <div className='flex flex-col flex-1 min-h-0'>
            <WhiteListedIPTable ref={ref} externalParams={params} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default WhiteListedIP;
