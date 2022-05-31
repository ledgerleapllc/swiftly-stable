import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthContainer } from 'shared/components/modules/AuthContainer';
import { useLoading } from 'shared/components/modules/Loading';
import { Button } from 'shared/components/partials';
import { Link, useLocation } from 'react-router-dom';
import { sendLoginMail } from 'stores/auth/actions';
import qs from 'qs';

const ThanksPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { setLoading } = useLoading();
  const [user, setUser] = useState();

  useEffect(() => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    if (query?.email) {
      dispatch(
        sendLoginMail(
          query.email,
          (res) => {
            setLoading(false);
            setUser(res);
          },
          () => {
            setLoading(false);
          }
        )
      );
    }
  }, []);
  return (
    <AuthContainer className="login-page" showInstruction>
      <div className="pb-6">
        <h3 className="capitalize font-semibold">Thanks {user?.first_name} {user?.last_name}!</h3>
        <p>Your application for Swiftly Stable will be reviewed by one of our admins! If accepted, you will receive an email explaining next steps.</p>
      </div>
      <Button className="w-full" as={Link} to="/auth/login">Go to Login</Button>
    </AuthContainer>
  )
};

export default ThanksPage;
