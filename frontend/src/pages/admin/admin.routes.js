import { lazy } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

const ApplicationsRoutes = lazy(() => import('./applications'));
const ApiKeysRoutes = lazy(() => import('./api-keys'));
const ApiKeysDetailRoutes = lazy(() => import('./api-keys/detail'));
const ApiLogsRoutes = lazy(() => import('./api-logs'));
const WalletsRoutes = lazy(() => import('./wallets'));
const SettingsRoutes = lazy(() => import('./settings'));
const HomeRoutes = lazy(() => import('./home'));

const AdminRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/home`} component={HomeRoutes} />
      <Route path={`${path}/applications`} component={ApplicationsRoutes} />
      <Route path={`${path}/api-keys`} component={ApiKeysRoutes} exact />
      <Route path={`${path}/api-keys/:id`} component={ApiKeysDetailRoutes} />
      <Route path={`${path}/api-logs`} component={ApiLogsRoutes} />
      <Route path={`${path}/wallets`} component={WalletsRoutes} />
      <Route path={`${path}/settings`} component={SettingsRoutes} />
      <Redirect from='*' to={`${path}/applications`} />
    </Switch>
  );
};

export default AdminRoutes;
