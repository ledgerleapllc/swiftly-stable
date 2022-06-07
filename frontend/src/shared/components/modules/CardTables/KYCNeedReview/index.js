import { ReactComponent as Shield } from 'assets/icons/shield.svg';
import React, { useEffect, useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Card, CardBody, CardHeader, Input } from 'shared/components/partials';
import KYCNeedReviewTable from './table';

const KYCNeedReview = (props) => {
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
    <Card className={props.className || ''}>
      <CardHeader icon={<Shield />} title='KYC Needing Review'>
        <Input className='bg-white w-64 py-1 px-2 text-3.25' placeholder='Search Email, Name, Shufti RefID' />
      </CardHeader>
      <CardBody>
        <div className='flex flex-col flex-1 min-h-0'>
          <Toolbar onChange={handleToolbarChange} hideSearch />
          <div className='flex flex-col flex-1 min-h-0'>
            <KYCNeedReviewTable externalParams={params} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default KYCNeedReview;