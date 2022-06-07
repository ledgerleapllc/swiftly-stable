import React from 'react';
import AllUserActivity from 'shared/components/modules/CardTables/AllUserActivity';

const UserActivityPage = () => {
  return (
    <section className='section-user-activity'>
      <div className='section-body'>
        <AllUserActivity />
      </div>
    </section>
  );
};

export default UserActivityPage;
