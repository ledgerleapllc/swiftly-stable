import Logo from 'assets/images/casper-logo.png';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { STATUS } from 'shared/common/enum';
import ApiCalls from 'shared/components/modules/CardTables/ApiCalls';
import WalletsHistory from 'shared/components/modules/CardTables/WalletsHistory';
import WhiteListedIP from 'shared/components/modules/CardTables/WhiteListedIPs';
import { useLoading } from 'shared/components/modules/Loading';
import ChangeWalletModal from 'shared/components/modules/Modals/ChangeWallet';
import ReplaceKeyModal from 'shared/components/modules/Modals/ReplaceKey';
import ResetPasswordModal from 'shared/components/modules/Modals/ResetPassword';
import StatusKeyModal from 'shared/components/modules/Modals/StatusKey';
import UpdateDailyCSPRLimitModal from 'shared/components/modules/Modals/UpdateDailyLimit';
import UpdateMonthlyCSPRLimitModal from 'shared/components/modules/Modals/UpdateMonthlyLimit';
import UpdateTXLimitModal from 'shared/components/modules/Modals/UpdateTxLimit';
import { Button } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import withPageSetting from 'shared/HOC/withPageSetting';
import { disableAPIKey, enableAPIKey, getAPIKey, getWallet } from 'stores/api/admin/actions';
import { getLimits } from 'stores/api/shared/actions';

const BREADCRUMB_DATA = [
  {
    label: 'API Keys',
    href: '/app/api-keys',
  },
  {
    label: 'Detail View',
  },
];

const ApiKeysDetail = ({ config }) => {
  const [apiKey, setApiKey] = useState({});
  const { setLoading } = useLoading();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { appendDialog } = useDialog();
  const historyTableRef = useRef();

  useEffect(() => {
    config.setBreadcrumb(BREADCRUMB_DATA);
  }, []);

  useEffect(() => {
    if (id) {
      fetchAPIKey();
      fetchLimit();
      fetchWallet();
    }
  }, [id]);

  const fetchAPIKey = () => {
    setLoading(true);
    dispatch(
      getAPIKey(
        {
          guid: id,
        },
        (res) => {
          setApiKey((prev) => ({ ...prev, ...res.detail }));
          setLoading(false);
        },
        (err) => {}
      )
    );
  };

  const fetchLimit = () => {
    setLoading(true);
    dispatch(
      getLimits(
        {
          guid: id,
        },
        (res) => {
          setApiKey((prev) => ({ ...prev, ...res.detail }));
          setLoading(false);
        },
        (err) => {}
      )
    );
  };

  const fetchWallet = () => {
    setLoading(true);
    dispatch(
      getWallet(
        {
          guid: id,
        },
        (res) => {
          setApiKey((prev) => ({ ...prev, address: res.detail.address }));
          setLoading(false);
        },
        (err) => {}
      )
    );
  };

  const user = [
    {
      title: 'User ID',
      key: 'guid',
    },
    {
      title: 'Email',
      key: 'email',
    },
    {
      title: 'Activation Date',
      key: 'created_at',
    },
    {
      title: 'Daily CSPR Limit',
      key: 'day_limit',
      onUpdate: () => handleActions('updateDailyCSPRLimit'),
    },
    {
      title: 'Monthly CSPR Limit',
      key: 'month_limit',
      onUpdate: () => handleActions('updateMonthlyCSPRLimit'),
    },
    {
      title: 'Per TX CSPR Limit',
      key: 'per_limit',
      onUpdate: () => handleActions('updatePerTXCSPRLimit'),
    },
    {
      title: 'Receiving Wallet Address',
      key: 'address',
    },
    {
      title: 'Total API calls',
      key: 'total_calls',
    },
    {
      title: 'Total CSPR Sent',
      key: 'total_cspr_sent',
    },
  ];

  const updateApiKeyStatus = () => {
    apiKey.active = apiKey.active === STATUS.ACTIVE ? STATUS.INACTIVE : STATUS.ACTIVE;
    setApiKey({ ...apiKey });
  };

  const handleChangeAPIKeyStatus = (disable) => {
    disable
      ? dispatch(
          enableAPIKey(
            {
              api_key_id: apiKey.api_key_id,
            },
            (res) => {
              appendDialog(
                <StatusKeyModal apiKey={apiKey} afterClosed={(e) => e === 'undo' && updateApiKeyStatus()} />
              );
              updateApiKeyStatus();
            }
          )
        )
      : dispatch(
          disableAPIKey(
            {
              api_key_id: apiKey.api_key_id,
            },
            (res) => {
              appendDialog(
                <StatusKeyModal disabled apiKey={apiKey} afterClosed={(e) => e === 'undo' && updateApiKeyStatus()} />
              );
              updateApiKeyStatus();
            }
          )
        );
  };

  const handleUpdate = (data) => {
    setApiKey((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleAfterCreatedWallet = (cond) => {
    if (cond) {
      fetchWallet();
      historyTableRef.current?.refresh();
    }
  };

  const handleActions = (type) => {
    switch (type) {
      case 'resetPassword':
        appendDialog(<ResetPasswordModal guid={id} />);
        break;
      case 'keyStatus':
        handleChangeAPIKeyStatus(apiKey.active === STATUS.INACTIVE);
        break;
      case 'replaceKey':
        appendDialog(<ReplaceKeyModal guid={id} />);
        break;
      case 'updateDailyCSPRLimit':
        appendDialog(<UpdateDailyCSPRLimitModal guid={id} currentLimit={apiKey.day_limit} onUpdate={handleUpdate} />);
        break;
      case 'updateMonthlyCSPRLimit':
        appendDialog(<UpdateMonthlyCSPRLimitModal guid={id} currentLimit={apiKey.month_limit} onUpdate={handleUpdate} />);
        break;
      case 'updatePerTXCSPRLimit':
        appendDialog(<UpdateTXLimitModal guid={id} currentLimit={apiKey.per_limit} onUpdate={handleUpdate} />);
        break;
      case 'changeWallet':
        appendDialog(<ChangeWalletModal guid={id} data={apiKey} afterClosed={handleAfterCreatedWallet} />);
        break;
      default:
        break;
    }
  };

  return (
    <section className='section-api-keys-detail'>
      <div className='section-body pt-6'>
        <p className='section-title text-sm font-semibold'>General Actions</p>
        <div className='button-actions flex gap-x-5 pt-7.5'>
          {apiKey &&
            [
              {
                type: 'resetPassword',
                text: 'Reset Portal Password',
              },
              {
                type: 'keyStatus',
                text: apiKey.active === STATUS.INACTIVE ? 'Enable Key' : 'Disable Key',
                color: apiKey.active === STATUS.INACTIVE ? 'success' : 'primary',
              },
              {
                type: 'replaceKey',
                text: 'Replace Key',
              },
              {
                type: 'changeWallet',
                text: 'Change Wallet',
              },
            ].map((action, index) => (
              <Button
                key={index}
                size='sm'
                color={action.color}
                rounded
                className='w-48 h-8'
                onClick={() => handleActions(action.type)}
              >
                {action.text}
              </Button>
            ))}
        </div>
        <div className='section-content pt-12.5 flex flex-col gap-y-6'>
          <p className='text-sm font-semibold'>Api Keyholder Details</p>
          <div className='flex gap-y-3 flex-col'>
            {user.map((user, index) => (
              <div key={index} className='flex gap-x-3'>
                <p className='text-sm'>{user.title}: </p>
                <p className='text-sm font-semibold flex'>
                  {user.key === 'total_cspr_sent' && <img className='mr-1 w-4' src={Logo} alt='logo' />}
                  {apiKey && apiKey[user.key]}
                </p>
                {user.onUpdate && (
                  <Button size='xs' className='rounded-full' onClick={user.onUpdate}>
                    Update
                  </Button>
                )}
              </div>
            ))}
          </div>
          <WhiteListedIP className='max-h-120' />
          <ApiCalls guid={id} className='max-h-120' />
          <WalletsHistory ref={historyTableRef} guid={id} className='max-h-120' />
        </div>
      </div>
    </section>
  );
};

export default withPageSetting(ApiKeysDetail);
