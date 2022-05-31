import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GeneralSettings from 'shared/components/modules/CardInfo/GeneralSettings';
import UpdateDailyCSPRLimitModal from 'shared/components/modules/Modals/UpdateDailyLimit';
import UpdateMonthlyCSPRLimitModal from 'shared/components/modules/Modals/UpdateMonthlyLimit';
import UpdateTXLimitModal from 'shared/components/modules/Modals/UpdateTxLimit';
import { Button } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import { getGuid } from 'shared/core/services/auth';
import withPageSetting from 'shared/HOC/withPageSetting';
import { getLimits } from 'stores/api/shared/actions';
import { getUserAPIKey, getUserWallet } from 'stores/api/user/actions';

const BREADCRUMB_DATA = [
  {
    label: 'User Settings',
    href: '/app/settings',
  },
  {
    label: 'General',
  },
];

const SettingsPage = ({ config }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer?.user);
  const [apiKey, setApiKey] = useState({});
  const { appendDialog } = useDialog();

  useEffect(() => {
    config.setBreadcrumb(BREADCRUMB_DATA);
    fetchLimit();
    fetchAPIKey();
    fetchWallet();
  }, []);

  const fetchLimit = () => {
    dispatch(
      getLimits(
        {
          guid: getGuid(),
        },
        (res) => {
          setApiKey((prev) => ({ ...prev, ...res.detail }));
        },
        (err) => {}
      )
    );
  };

  const fetchAPIKey = () => {
    dispatch(
      getUserAPIKey(
        {
          guid: getGuid(),
        },
        (res) => {
          setApiKey((prev) => ({ ...prev, ...res.detail }));
        },
        (err) => {}
      )
    );
  };

  const fetchWallet = () => {
    dispatch(
      getUserWallet(
        {
          guid: getGuid(),
        },
        (res) => {
          setApiKey((prev) => ({ ...prev, address: res.detail.address }));
        },
        (err) => {}
      )
    );
  };

  const handleUpdate = (data) => {
    setApiKey((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleActions = (type) => {
    switch (type) {
      case 'updateDailyCSPRLimit':
        appendDialog(
          <UpdateDailyCSPRLimitModal guid={getGuid()} currentLimit={apiKey?.day_limit} onUpdate={handleUpdate} />
        );
        break;
      case 'updateMonthlyCSPRLimit':
          appendDialog(
            <UpdateMonthlyCSPRLimitModal guid={getGuid()} currentLimit={apiKey?.month_limit} onUpdate={handleUpdate} />
          );
          break;
      case 'updatePerTXCSPRLimit':
        appendDialog(<UpdateTXLimitModal guid={getGuid()} currentLimit={apiKey?.per_limit} onUpdate={handleUpdate} />);
        break;
      default:
        break;
    }
  };

  return (
    <section className='section-settings flex justify-between'>
      <div className='section-body pt-4 max-w-4xl'>
        <GeneralSettings />
        <div className='section-content pt-12.5 flex flex-col gap-y-6'>
          <p className='text-sm font-semibold'>User Details</p>
          <div className='flex gap-y-3 flex-col'>
            {[
              {
                title: 'User ID',
                value: user?.guid,
              },
              {
                title: 'Email',
                value: user?.email,
              },
              {
                title: 'Activation Date',
                value: user?.created_at,
              },
              {
                title: 'Daily CSPR Limit',
                value: apiKey?.day_limit,
                onUpdate: () => handleActions('updateDailyCSPRLimit'),
              },
              {
                title: 'Monthly CSPR Limit',
                value: apiKey?.month_limit,
                onUpdate: () => handleActions('updateMonthlyCSPRLimit'),
              },
              {
                title: 'Per TX CSPR Limit',
                value: apiKey?.per_limit,
                onUpdate: () => handleActions('updatePerTXCSPRLimit'),
              },
              {
                title: 'Receiving Wallet Address',
                value: apiKey?.address,
              },
              {
                title: 'Total API calls',
                value: apiKey?.total_calls,
              },
              {
                title: 'Total CSPR Sent',
                value: user?.cspr_actual,
              },
            ].map((user, index) => (
              <div key={index} className='flex gap-x-3'>
                <p className='text-sm'>{user.title}: </p>
                <p className='text-sm font-semibold'>{user.value}</p>
                {user.onUpdate && (
                  <Button size='xs' className='rounded-full' onClick={user.onUpdate}>
                    Update
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='pt-4'>
        <Button as={'a'} target="_blank" href={`${process.env.REACT_APP_BASE_URL}/docs`} rounded>
          Developer Documentation
        </Button>
      </div>
    </section>
  );
};

export default withPageSetting(SettingsPage);
