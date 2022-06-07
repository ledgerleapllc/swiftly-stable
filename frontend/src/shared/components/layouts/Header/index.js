import { ReactComponent as UserProfile } from 'assets/icons/user-circle.svg';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuList } from 'shared/components/partials/Menu';
import { logout } from 'stores/auth/actions';
import style from './style.module.scss';

export const Header = () => {
  const user = useSelector((state) => state.authReducer?.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const doLogout = () => {
    dispatch(
      logout(null, () => {
        history.push('/auth/logout');
      })
    );
  };

  return (
    <div>
      <nav className='px-6 py-2.5 border-b'>
        <div className='flex flex-wrap justify-between items-center mx-auto'>
          <Link to='/' className='flex items-center'>
            <img className={style.logo} src='/images/logo.png' alt='logo' />
          </Link>
          {user && (
            <div className='w-auto'>
              <Menu>
                <MenuButton className='flex items-center gap-x-2'>
                  <UserProfile width={20} height={20} />
                  <p>{user?.email}</p>
                </MenuButton>
                <MenuList className={style.userDropList}>
                  <MenuItem onClick={doLogout}>Log Out</MenuItem>
                </MenuList>
              </Menu>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
