import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { AuthContainer } from 'shared/components/modules/AuthContainer';
import { useLoading } from 'shared/components/modules/Loading';
import { Button, Input } from 'shared/components/partials';
import { removeTempToken, setToken } from 'shared/core/services/auth';
import { sendMFA } from 'stores/api/shared/actions';
import { confirmRegistration, verifyCode } from 'stores/auth/actions';

function VerifyCode() {
  const { setLoading } = useLoading();
  const params = useParams();
  const [screen, setScreen] = useState();

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (location) {
      if (location.pathname.includes('2fa')) {
        setScreen(1);
      } else if (location.pathname.includes('verify-email')) {
        setScreen(2);
      }
    }
  }, [location]);

  const onSubmit = (data) => {
    const { guid } = params;
    setLoading(true);
    if (screen === 1) {
      dispatch(
        verifyCode(
          {
            mfa_code: data.code,
            guid,
          },
          (res) => {
            setLoading(false);
            setToken(res?.detail?.bearer);
            removeTempToken();
            history.push('/app');
          },
          () => {
            setLoading(false);
            setError('code', { type: 'custom', message: 'Verification code is not correct' });
          }
        )
      );
    } else if (screen === 2) {
      dispatch(
        confirmRegistration(
          {
            confirmation_code: data.code,
            guid,
          },
          () => {
            setLoading(false);
            removeTempToken();
            history.push({
              pathname: `/auth/thanks`,
              search: location.search,
            });
          },
          () => {
            setLoading(false);
            setError('code', { type: 'custom', message: 'Verification code is not correct' });
          }
        )
      );
    }
  };

  const handleResendCode = () => {
    dispatch(sendMFA({ guid: params.guid }));
  };

  return (
    <AuthContainer className='login-page' showInstruction>
      <div className='pb-6'>
        <h3 className='font-semibold'>Second Step Verification</h3>
        {screen === 1 && (
          <p>
            You’re trying to log in. To make sure your account is secure, we have to verify your identity. We sent a 2fa
            verification code to your inbox.
          </p>
        )}
        {screen === 2 && (
          <p>
            To make sure your account is secure, we have to verify your identity. We sent a 2fa verification code to
            your inbox.
          </p>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-5'>
        <Input placeholder='Enter Verification Code' {...register('code')} error={errors && errors?.code?.message} />
        <Button type='submit' className='w-full' disabled={!isValid}>
          Verify
        </Button>
      </form>
      <div className='text-right pt-4'>
        <Button variant='text' className='mt-4' onClick={handleResendCode}>
          Resend Code
        </Button>
      </div>
    </AuthContainer>
  );
}

export default VerifyCode;
