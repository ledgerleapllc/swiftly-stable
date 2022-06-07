import React from 'react';
import { ReactComponent as ArrowLeft } from 'assets/icons/arrow-left.svg';
import Pool from 'shared/components/modules/CardInfo/Pool';
import UsersInPool from 'shared/components/modules/CardTables/UsersInPool';
import { useHistory } from 'react-router-dom';
import { Button } from 'shared/components/partials';

const PoolDetailPage = (props) => {
  const history = useHistory();
  return (
    <section className='section-yield-pools-detail'>
      <div className='section-body pt-9'>
        <div className='flex justify-between items-center'>
          <button className='flex gap-3 items-center' onClick={() => history.goBack()}>
            <div className='text-primary'>
              <ArrowLeft />
            </div>
            Back
          </button>
          <Button size='sm' color='danger'>
            Close pool
          </Button>
        </div>

        <div className='flex flex-col gap-4 mt-4'>
          <Pool />
          <UsersInPool />
        </div>
      </div>
    </section>
  );
};

export default PoolDetailPage;
