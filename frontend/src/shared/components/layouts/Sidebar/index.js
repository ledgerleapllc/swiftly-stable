import { ReactComponent as Buffer } from 'assets/icons/buffer.svg';
import { ReactComponent as ChevronLeft } from 'assets/icons/circle-chevron-left.svg';
import { ReactComponent as Dashboard } from 'assets/icons/dashboard.svg';
import { ReactComponent as Hexagon } from 'assets/icons/hexagon.svg';
import { ReactComponent as Settings } from 'assets/icons/settings.svg';
import { ReactComponent as Shield } from 'assets/icons/shield.svg';
import { ReactComponent as UserGroup } from 'assets/icons/user-group.svg';
import { ReactComponent as UserPlus } from 'assets/icons/user-plus.svg';
import React from 'react';
import { useSelector } from 'react-redux';
import MenuItem from './components/MenuItem';
import './style.module.scss';

const menuData = {
  admin: [
    {
      component: <Dashboard />,
      text: 'Dashboard',
      href: '/app/dashboard',
    },
    {
      component: <UserPlus />,
      text: 'Onboarding',
      href: '/app/onboarding',
    },
    {
      component: <UserGroup />,
      text: 'Users',
      href: '/app/users',
    },
    {
      component: <Shield />,
      text: 'Manage KYC',
      href: '/app/manage-kyc',
    },
    {
      component: <Buffer />,
      text: 'User Activity',
      href: '/app/user-activity',
    },
    {
      component: <ChevronLeft />,
      text: 'Withdraws',
      href: '/app/withdraws',
    },
    {
      component: <Hexagon />,
      text: 'Yield Pools',
      href: '/app/yield-pools',
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
      component: <Shield />,
      text: 'KYC',
      href: '/app/kyc',
    },
    {
      component: <Buffer />,
      text: 'Activity',
      href: '/app/activity',
    },
    {
      component: <Settings />,
      text: 'Yield Pools',
      href: '/app/yield-pools',
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
          {menuData['admin']?.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
