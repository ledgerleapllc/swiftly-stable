import { yupResolver } from '@hookform/resolvers/yup';
import { ReactComponent as MailBox } from 'assets/icons/mail-box.svg';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PATTERN } from 'shared/common/pattern';
import { AuthContainer } from 'shared/components/modules/AuthContainer';
import { useLoading } from 'shared/components/modules/Loading';
import { Button, Input } from 'shared/components/partials';
import { forgotPassword } from 'stores/auth/actions';
import * as yup from 'yup';

const SendToMail = (props) => {
  return (
    <AuthContainer className='login-page' showInstruction>
      <div className='flex flex-col items-center justify-center'>
        <MailBox />
        <h3 className='font-boild my-2'>Check your inbox!</h3>
        <Link className='text-primary' to='/auth/login'>
          Back to Log In
        </Link>
        <p className='mt-5'>
          Don’t get the email?
          <Button variant='text' onClick={props.retry}>
            Click here to resend it.
          </Button>
        </p>
      </div>
    </AuthContainer>
  );
};

const schema = yup
  .object()
  .shape({
    email: yup.string().matches(PATTERN.EMAIL, 'Email address is invalid').required(),
  })
  .required();

const ForgotPasswordForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    props.onSubmit(data);
  };

  return (
    <AuthContainer className='login-page' showInstruction>
      <div className='pb-6'>
        <h3 className='font-semibold'>Reset Password</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-5'>
        <Input placeholder='Email Address' {...register('email')} error={errors && errors?.email?.message} />
        <Button type='submit' className='w-full' disabled={!isValid}>
          Get Reset Email
        </Button>
      </form>
      <div className='flex pt-4'>
        <Link className='text-primary' to='/auth/login'>
          Back
        </Link>
      </div>
    </AuthContainer>
  );
};

const ForgotPasswordPage = () => {
  const [data, setData] = useState(null);
  const [step, setStep] = useState(1);
  const { setLoading } = useLoading();
  const dispatch = useDispatch();

  const onSubmit = ({ email }) => {
    setData({ email });
  };

  useEffect(() => {
    if (data) {
      retry();
    }
  }, [data]);

  const retry = () => {
    setLoading(true);
    dispatch(
      forgotPassword(
        data,
        (res) => {
          setLoading(false);
          step === 1 && setStep(2);
        },
        (err) => {
          setLoading(false);
        }
      )
    );
  };

  return step === 1 ? <ForgotPasswordForm onSubmit={onSubmit} /> : <SendToMail retry={retry} />;
};

export default ForgotPasswordPage;
