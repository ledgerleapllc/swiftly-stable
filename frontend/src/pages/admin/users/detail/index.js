import { ReactComponent as ArrowLeft } from 'assets/icons/arrow-left.svg';
import React from 'react';
import { useHistory } from 'react-router-dom';
import UserInfo from 'shared/components/modules/CardInfo/User';
import AllActivity from 'shared/components/modules/CardTables/AllActivity';
import YieldPools from 'shared/components/modules/CardTables/YieldPools';

const UsersDetailPage = () => {
  const history = useHistory();
  return (
    <section className='section-uses-detail'>
      <div className='section-body grid grid-cols-3 gap-4'>
        <div className='col-span-2 flex flex-col gap-4 mt-9'>
          <button className='flex gap-3 items-center' onClick={() => history.goBack()}>
            <div className='text-primary'>
              <ArrowLeft />
            </div>
            Back
          </button>
          <YieldPools />
          <AllActivity />
        </div>
        <div>
          <UserInfo />
        </div>
      </div>
    </section>
  );
};

export default UsersDetailPage;
