import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import MyApiKeys from 'shared/components/modules/CardTables/MyApiKeys';
import MyWallets from 'shared/components/modules/CardTables/MyWallets';
import ChangeWalletModal from 'shared/components/modules/Modals/ChangeWallet';
import ReplaceKeyModal from 'shared/components/modules/Modals/ReplaceKey';
import { Button, CopyButton } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import { getUserAPIKey, getUserWallet } from 'stores/api/user/actions';

const KeysAndWalletsPage = (props) => {
  const dispatch = useDispatch();
  const [wallet, setWallet] = useState('');
  const [apiKey, setApiKey] = useState('');
  const myWalletsRef = useRef();
  const { appendDialog } = useDialog();

  useEffect(() => {
    dispatch(
      getUserAPIKey(null, (res) => {
        setApiKey(res.detail);
      })
    );
    dispatch(
      getUserWallet(null, (res) => {
        setWallet(res.detail);
      })
    );
  }, []);

  const handleUpdateKey = (apiKey) => {
    setApiKey((prev) => ({
      ...prev,
      api_key: apiKey,
    }));
  };

  const handleUpdateWallet = (address) => {
    setWallet((prev) => ({
      ...prev,
      address: address,
    }));
  };

  const handleAfterCreatedWallet = (cond) => {
    if (cond) {
      myWalletsRef.current?.refresh();
    }
  };

  const handleOpenModal = (type) => {
    switch (type) {
      case 'replaceKey':
        appendDialog(<ReplaceKeyModal onUpdate={handleUpdateKey} />);
        break;

      case 'changeWallet':
        appendDialog(<ChangeWalletModal data={wallet} onUpdate={handleUpdateWallet} afterClosed={handleAfterCreatedWallet} />);
        break;

      default:
        break;
    }
  };

  return (
    <section className='section-keys-wallets h-full'>
      <div className='section-body flex flex-col gap-y-6 h-full'>
        <div className='h-1/2 flex flex-col'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-2 items-center py-5'>
              <b className='whitespace-nowrap'>Active API Key:</b>
              <p>{apiKey?.api_key}</p>
              <input defaultValue={apiKey?.api_key} id='active-api-key-id' readOnly hidden />
              <CopyButton from='active-api-key-id' />
            </div>
            <div className='flex gap-x-2'>
              <Button as={Link} to={'/app/settings'} size='sm' rounded className='px-5 py-6'>
                Update Limits
              </Button>
              <Button size='sm' rounded className='px-5 py-6' onClick={() => handleOpenModal('replaceKey')}>
                Replace key
              </Button>
            </div>
          </div>
          <div className='flex-1 min-h-0'>
            <MyApiKeys />
          </div>
        </div>
        <div className='h-1/2 flex flex-col'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-2 items-center py-5'>
              <b className='whitespace-nowrap'>Active Wallet:</b>
              <p>{wallet?.address}</p>
              <input defaultValue={wallet?.address} id='active-wallet-id' hidden readOnly />
              <CopyButton from='active-wallet-id' />
            </div>
            <div className='flex gap-x-2'>
              <Button size='sm' rounded className='px-5 py-6' onClick={() => handleOpenModal('changeWallet')}>
                Change Wallet
              </Button>
            </div>
          </div>
          <div className='flex-1 min-h-0'>
            <MyWallets ref={myWalletsRef}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeysAndWalletsPage;
