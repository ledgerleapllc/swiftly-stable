import React from 'react';
import MyKYCStatus from 'shared/components/modules/CardInfo/MyKYCStatus';

const KYCPage = () => {
  return (
    <section className='section-kyc h-full'>
      <div className='section-body h-full flex flex-col'>
        <div className='flex gap-10'>
          <MyKYCStatus />
          <div className='section-content pt-12.5 flex-1 min-h-0'></div>
        </div>
      </div>
    </section>
  );
};

export default KYCPage;
