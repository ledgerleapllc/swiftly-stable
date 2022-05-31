import React from 'react';
import APIKeyUsage from 'shared/components/modules/CardInfo/APIKeyUsage';
import AllApiCalls from 'shared/components/modules/CardTables/AllApiCalls';

const MyAPILogsPage = () => {
  return (
    <section className='section-my-api-logs h-full'>
      <div className='section-body pt-4 h-full flex flex-col'>
        <APIKeyUsage />
        <div className='section-content pt-12.5 flex-1 min-h-0'>
          <AllApiCalls />
        </div>
      </div>
    </section>
  );
};

export default MyAPILogsPage;
