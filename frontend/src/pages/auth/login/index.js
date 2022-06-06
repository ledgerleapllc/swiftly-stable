import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PATTERN } from 'shared/common/pattern';
import { AuthContainer } from 'shared/components/modules/AuthContainer';
import { useLoading } from 'shared/components/modules/Loading';
import { Button, Input } from 'shared/components/partials';
import { ErrorHandler, STATUS_CODE } from 'shared/core/services/api';
import { setToken } from 'shared/core/services/auth';
import { login, sendLoginMail, setUser } from 'stores/auth/actions';
import * as yup from 'yup';

const Login = () => {
  const [userLogin, setUserLogin] = useState({
    firstName: '',
    lastName: '',
  });
  const { setLoading } = useLoading();
  const history = useHistory();

  const schema = yup
    .object()
    .shape({
      step: yup.number(),
      email: yup.string().matches(PATTERN.EMAIL, 'Email address is invalid').required(),
      password: yup.string().when('step', {
        is: (st) => st === 2,
        then: yup.string().required(),
        otherwise: yup.string().notRequired(),
      }),
    })
    .required();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      step: 1,
    },
  });

  const step = watch('step');
  const dispatch = useDispatch();

  const onSubmitEmail = (data) => {
    const { email } = data;
    setLoading(true);
    dispatch(
      sendLoginMail(
        email,
        (res) => {
          setLoading(false);
          setUserLogin({
            ...userLogin,
            firstName: res.first_name,
            lastName: res.last_name,
          });
          setValue('step', 2);
        },
        () => {
          setLoading(false);
          setError('email', { type: 'custom', message: 'Email is not found' });
        }
      )
    );
  };

  const onSubmitLogin = (data) => {
    const { email, password } = data;
    setLoading(true);
    dispatch(
      login(
        { email, password },
        (res) => {
          setLoading(false);
          const { detail } = res;
          if (detail.user?.verified === '0') {
            history.push({
              pathname: `/auth/verify-email/${detail.guid}`,
            });
            return;
          }
          if (detail.twofa || detail.user?.twofa === '1') {
            history.push({
              pathname: `/auth/2fa/${detail.guid}`,
            });
            return;
          }
          if (detail.user?.role !== 'admin' && detail.user?.admin_approved === '0') {
            history.push({
              pathname: `/auth/reviewing`,
            });
            return;
          }
          if (!detail.user) {
            throw new ErrorHandler({ status: 'custom', message: STATUS_CODE.UNEXPECTED });
          }
          if (detail?.bearer) {
            setToken(detail.bearer);
            dispatch(setUser(detail.user));
            history.push('/app');
            return;
          }
        },
        (err) => {
          setLoading(false);
          setError('password', { type: 'custom', message: err.message });
        }
      )
    );
  };

  const goBack = () => {
    setValue('step', 1);
  };

  return (
    <AuthContainer className='login-page' showInstruction>
      {step === 1 && (
        <>
          <h3 className='pb-6 font-semibold'>Log in</h3>
          <form onSubmit={handleSubmit(onSubmitEmail)} className='flex flex-col space-y-5'>
            <Input placeholder='Email Address' {...register('email')} error={errors && errors?.email?.message} />
            <Button type='submit' className='w-full' disabled={!isValid}>
              Next
            </Button>
          </form>
        </>
      )}
      {step === 2 && (
        <>
          <h3 className='capitalize pb-6 font-semibold'>
            Hello, {userLogin.firstName} {userLogin.lastName}
          </h3>
          <form onSubmit={handleSubmit(onSubmitLogin)} className='flex flex-col space-y-5'>
            <Input
              type='password'
              placeholder='Password'
              {...register('password')}
              error={errors && errors?.password?.message}
            />
            <Button type='submit' className='w-full' disabled={!isValid}>
              Next
            </Button>
          </form>
        </>
      )}
      <div className='flex pt-4'>
        {step === 2 && (
          <button className='text-primary' onClick={goBack}>
            Back
          </button>
        )}
        {step === 1 && (
          <p className='ml-auto'>
            Don’t have an account?{' '}
            <Link className='text-primary' to='/auth/signup'>
              Sign Up
            </Link>
          </p>
        )}
        {step === 2 && (
          <p className='ml-auto'>
            <Link className='text-primary' to='/auth/forgot-password'>
              Forgot Password?
            </Link>
          </p>
        )}
      </div>
    </AuthContainer>
  );
};

export default Login;
