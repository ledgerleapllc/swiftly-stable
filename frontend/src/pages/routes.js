import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'shared/components/layouts/Header';
import Sidebar from 'shared/components/layouts/Sidebar';
import { fetchUserInfo } from 'stores/auth/actions';
import AdminRoutes from './admin/admin.routes';
import UserRoutes from './user/user.routes';

const AppRoutes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer?.user);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  const renderRoute = () => {
    if (user) {
      if (user?.role === 'admin') {
        return (
          <Suspense fallback={null}>
            <AdminRoutes />
          </Suspense>
        );
      } else {
        return (
          <Suspense fallback={null}>
            <UserRoutes />
          </Suspense>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <>
      <Header />
      <div className='content-wrapper flex'>
        <Sidebar />
        <div className='py-2.5 px-6 h-full w-full overflow-y-auto overflow-x-auto'>{renderRoute()}</div>
      </div>
    </>
  );
};

export default AppRoutes;
