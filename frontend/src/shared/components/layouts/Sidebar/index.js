import { ReactComponent as Buffer } from 'assets/icons/buffer.svg';
import { ReactComponent as Clipboard } from 'assets/icons/clipboard.svg';
import { ReactComponent as Dashboard } from 'assets/icons/dashboard.svg';
import { ReactComponent as Key } from 'assets/icons/key.svg';
import { ReactComponent as Settings } from 'assets/icons/settings.svg';
import { ReactComponent as Wallet } from 'assets/icons/wallet.svg';
import React from 'react';
import { useSelector } from 'react-redux';
import MenuItem from './components/MenuItem';
import './style.module.scss';

const menuData = {
  admin: [
    {
      component: <Clipboard />,
      text: 'Applications',
      href: '/app/applications',
    },
    {
      component: <Key />,
      text: 'API Keys',
      href: '/app/api-keys',
    },
    {
      component: <Buffer />,
      text: 'API Logs',
      href: '/app/api-logs',
    },
    {
      component: <Wallet />,
      text: 'Wallets',
      href: '/app/wallets',
    },
    {
      component: <Settings />,
      text: 'Settings',
      href: '/app/settings',
    },
  ],
  user: [
    {
      component: <Dashboard />,
      text: 'Dashboard',
      href: '/app/dashboard',
    },
    {
      component: <Buffer />,
      text: 'KYC',
      href: '/app/kyc',
    },
    {
      component: <Key />,
      text: 'Keys & Wallets',
      href: '/app/keys-wallets',
    },
    {
      component: <Settings />,
      text: 'Settings',
      href: '/app/settings',
    },
  ],
};

const Sidebar = () => {
  const user = useSelector((state) => state.authReducer?.user);

  return (
    <>
      <div className='mt-2.5 sidebar w-20 sm:w-60 transition-all duration-200 ease-in-out'>
        <ul className='pt-3 menu'>
          {menuData['user']?.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
