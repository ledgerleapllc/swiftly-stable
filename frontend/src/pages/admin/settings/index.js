import React, { useEffect } from 'react';
import GeneralSettings from 'shared/components/modules/CardInfo/GeneralSettings';
import AdminsCard from 'shared/components/modules/CardTables/Admins';
import withPageSetting from 'shared/HOC/withPageSetting';

const BREADCRUMB_DATA = [
  {
    label: 'Admin Settings',
    href: '/app/settings',
  },
  {
    label: 'General',
  },
];

const Settings = ({ config }) => {
  useEffect(() => {
    config.setBreadcrumb(BREADCRUMB_DATA);
  }, []);

  return (
    <section className='section-settings'>
      <div className='section-body pt-4'>
        <GeneralSettings />
        <div className='section-content pt-12.5'>
          <AdminsCard />
        </div>
      </div>
    </section>
  );
};

export default withPageSetting(Settings);
