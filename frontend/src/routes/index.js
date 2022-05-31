import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { Redirect, Switch } from 'react-router-dom';
import AppRoute from './AppRoute';
import AuthRoute from './AuthRoute';
import ScrollToTop from './ScrollToTop';

const AuthRoutes = lazy(() => import('pages/auth/auth.routes'));
const AppRoutes = lazy(() => import('pages/routes'));
const PublicRoutes = lazy(() => import('pages/public/public.routes'));

const Routes = () => {
  return (
    <Suspense fallback={null}>
      <ScrollToTop />
      <Switch>
        <AuthRoute path='/auth' component={AuthRoutes} />
        <AppRoute path='/app' component={AppRoutes} />
        <Route path={[`/help`, `/privacy-policy`, `/terms-conditions`]} component={PublicRoutes} exact />
        <Redirect from='*' to={`/app`} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
