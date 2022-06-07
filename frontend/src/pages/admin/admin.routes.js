import { lazy } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

const DashboardRoutes = lazy(() => import('./dashboard'));
const OnboardingsRoutes = lazy(() => import('./onboarding'));
const UsersRoutes = lazy(() => import('./users'));
const UsersDetailRoutes = lazy(() => import('./users/detail'));
const ManageKYCsRoutes = lazy(() => import('./manage-kyc'));
const UsersActivityRoutes = lazy(() => import('./user-activity'));
const WithdrawsRoutes = lazy(() => import('./withdraws'));
const YieldPoolsRoutes = lazy(() => import('./yield-pools'));
const YieldPoolsDetailRoutes = lazy(() => import('./yield-pools/detail'));

const SettingsRoutes = lazy(() => import('./settings'));
const HomeRoutes = lazy(() => import('./home'));

const AdminRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/dashboard`} component={DashboardRoutes} />
      <Route path={`${path}/onboarding`} component={OnboardingsRoutes} />
      <Route path={`${path}/users`} component={UsersRoutes} exact />
      <Route path={`${path}/users/:id`} component={UsersDetailRoutes} />
      <Route path={`${path}/manage-kyc`} component={ManageKYCsRoutes} />
      <Route path={`${path}/user-activity`} component={UsersActivityRoutes} />
      <Route path={`${path}/withdraws`} component={WithdrawsRoutes} />
      <Route path={`${path}/yield-pools`} component={YieldPoolsRoutes} exact />
      <Route path={`${path}/yield-pools/:id`} component={YieldPoolsDetailRoutes} />

      <Route path={`${path}/settings`} component={SettingsRoutes} />
      <Redirect from='*' to={`${path}/applications`} />
    </Switch>
  );
};

export default AdminRoutes;
