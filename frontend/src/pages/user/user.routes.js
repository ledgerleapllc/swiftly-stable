import React, { lazy } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

const DashboardRoutes = lazy(() => import('./dashboard'));
const KYCRoutes = lazy(() => import('./kyc'));
const ActivitiesRoutes = lazy(() => import('./activity'));
const YieldPoolsRoutes = lazy(() => import('./yield-pools'));
const SettingsRoutes = lazy(() => import('./settings'));

const UserRoutes = (props) => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/dashboard`} component={DashboardRoutes} />
      <Route path={`${path}/kyc`} component={KYCRoutes} />
      <Route path={`${path}/activity`} component={ActivitiesRoutes} />
      <Route path={`${path}/yield-pools`} component={YieldPoolsRoutes} />
      <Route path={`${path}/settings`} component={SettingsRoutes} />
      <Redirect from='*' to={`${path}/dashboard`} />
    </Switch>
  );
};

UserRoutes.propTypes = {};

export default UserRoutes;
