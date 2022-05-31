import React, { useEffect } from 'react';
import StablecoinBalance from 'shared/components/modules/CardInfo/StablecoinBalance';
import TermsOfService from 'shared/components/modules/Modals/TermsOfService';
import { useDialog } from 'shared/components/partials/Dialog/Provider';

const DashboardPage = () => {
  const { appendDialog } = useDialog();

  useEffect(() => {
    appendDialog(<TermsOfService />);
  }, []);

  return (
    <section className='section-dashboard h-full'>
      <div className='section-body h-full flex flex-col'>
        <div className='flex gap-10'>
          <StablecoinBalance data={{}} />
          <div className='section-content pt-12.5 flex-1 min-h-0'></div>
        </div>
      </div>
    </section>
  );
};

DashboardPage.propTypes = {};

export default DashboardPage;
