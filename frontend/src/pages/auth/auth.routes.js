import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

const LoginRoutes = lazy(() => import('./login'));
const EntitySignUpRoutes = lazy(() => import('./signup/entity'));
const IndividualSignUpRoutes = lazy(() => import('./signup/individual'));
const ForgotPasswordRoutes = lazy(() => import('./forgot-password'));
const ResetPasswordRoutes = lazy(() => import('./reset-password'));
const VerifyCodeRoutes = lazy(() => import('./verify-code'));
const ThanksRoutes = lazy(() => import('./thanks'));
const NotApproved = lazy(() => import('./review'));
const LogoutRoutes = lazy(() => import('./logout'));

const AuthRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path={`${path}/login`} component={LoginRoutes} exact />
        <Route path={`${path}/signup/entity`} component={EntitySignUpRoutes} exact />
        <Route path={`${path}/signup/individual`} component={IndividualSignUpRoutes} exact />
        <Route path={`${path}/forgot-password`} component={ForgotPasswordRoutes} exact />
        <Route path={`${path}/reset-password/:hash`} component={ResetPasswordRoutes} exact />
        <Route path={[`${path}/2fa/:guid`, `${path}/verify-email/:guid`]} component={VerifyCodeRoutes} exact />
        <Route path={`${path}/thanks`} component={ThanksRoutes} exact />
        <Route path={`${path}/reviewing`} component={NotApproved} exact />
        <Route path={`${path}/logout`} component={LogoutRoutes} exact />

        <Redirect from='*' to={`${path}/login`} />
      </Switch>
    </Suspense>
  );
};

export default AuthRoutes;
