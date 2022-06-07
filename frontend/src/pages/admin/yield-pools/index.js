import React from 'react';
import AllYieldPools from 'shared/components/modules/CardTables/AllYieldPools';

const YieldPoolsPage = (props) => {
  return (
    <section className='section-yield-pools'>
      <div className='section-body'>
        <AllYieldPools />
      </div>
    </section>
  );
};

export default YieldPoolsPage;
