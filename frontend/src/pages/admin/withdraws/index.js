import classNames from 'classnames';
import React, { Fragment, useState } from 'react';
import CompletedRequests from 'shared/components/modules/CardTables/CompletedRequests';
import PendingRequests from 'shared/components/modules/CardTables/PendingRequests';

const WithdrawsPage = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const tabs = [
    {
      title: 'Pending Requests',
      value: 'pending',
      component: <PendingRequests />,
    },
    {
      title: 'Completed',
      value: 'completed',
      component: <CompletedRequests />,
    },
  ];
  return (
    <section className='section-with-draws'>
      <div className='section-body mt-9'>
        <div className='flex gap-5'>
          {tabs.map((tab, index) => (
            <p
              key={index}
              className={classNames('font-semibold text-sm cursor-pointer', {
                'border-b-2 border-primary pb-2': tab.value === activeTab,
              })}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.title}
            </p>
          ))}
        </div>
        <div className='pt-5'>
          {tabs.map((tab, index) => tab.value === activeTab && <Fragment key={index}>{tab.component}</Fragment>)}
        </div>
      </div>
    </section>
  );
};

export default WithdrawsPage;
