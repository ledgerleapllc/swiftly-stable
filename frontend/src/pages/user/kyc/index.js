import React from 'react';
import KYCStatus from 'shared/components/modules/CardInfo/KYCStatus';

const KYCPage = () => {
  return (
    <section className='section-kyc h-full'>
      <div className='section-body h-full flex flex-col'>
        <div className='flex gap-10'>
          <KYCStatus />
          <div className='section-content pt-12.5 flex-1 min-h-0'></div>
        </div>
      </div>
    </section>
  );
};

export default KYCPage;
