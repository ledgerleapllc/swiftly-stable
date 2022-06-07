import React from 'react';
import StablecoinBalance from 'shared/components/modules/CardInfo/StablecoinBalance';
import AllActivity from 'shared/components/modules/CardTables/AllActivity';

const ActivitiesPage = (props) => {
  return (
    <section className='section-activity'>
      <div className='section-body'>
        <div className='flex gap-10'>
          <StablecoinBalance data={{}} isActive />
        </div>
        <div className='section-content pt-12.5'>
          <AllActivity />
        </div>
      </div>
    </section>
  );
};

export default ActivitiesPage;
