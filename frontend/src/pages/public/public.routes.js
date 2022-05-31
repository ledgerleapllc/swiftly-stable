import { Route, Switch } from 'react-router-dom';
import Header from 'shared/components/layouts/Header';
import Help from './help';
import PrivacyPolicy from './privacy-policy';
import TermsConditions from './terms-conditions';

const PublicRoutes = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path={`/help`} component={Help} exact />
        <Route path={`/privacy-policy`} component={PrivacyPolicy} exact />
        <Route path={`/terms-conditions`} component={TermsConditions} exact />
      </Switch>
    </>
  );
};

export default PublicRoutes;
