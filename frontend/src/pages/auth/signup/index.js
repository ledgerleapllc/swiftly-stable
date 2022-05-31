import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { PATTERN } from 'shared/common/pattern';
import { AuthContainer } from 'shared/components/modules/AuthContainer';
import { useLoading } from 'shared/components/modules/Loading';
import { Button, Input } from 'shared/components/partials';
import { setTempToken } from 'shared/core/services/auth';
import { signUp } from 'stores/auth/actions';
import * as yup from 'yup';
import qs from 'qs';

const schema = yup
  .object()
  .shape({
    email: yup.string().required().matches(PATTERN.EMAIL, 'Email address is invalid'),
    confirm_email: yup
      .string()
      .oneOf([yup.ref('email'), null], 'Email must match')
      .required(),
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    password: yup
      .string()
      .matches(
        PATTERN.PASSWORD,
        'Please use a password with at least 8 characters including at least one number, one letter and one symbol'
      )
      .required(),
    confirm_password: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Confirm password must match')
      .required(),
    company: yup.string(),
    description: yup.string(),
    cspr_expectation: yup.string(),
  })
  .required();

const SignUp = (props) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const { setLoading } = useLoading();
  const history = useHistory();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    setLoading(true);
    dispatch(
      signUp(
        data,
        (res) => {
          setLoading(false);
          const { detail } = res;
          setTempToken(detail?.bearer);
          history.push({
            pathname: `/auth/verify-email/${detail.guid}`,
            search: qs.stringify({ email: data.email }),
          });
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  return (
    <AuthContainer className='signup-page' showInstruction>
      <div className='h-full flex flex-col'>
        <div className='pb-3'>
          <h3 className='font-semibold'>Sign Up</h3>
        </div>
        <div className='-mx-12 flex-1 min-h-0 overflow-y-scroll'>
          <div className='px-12'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-3'>
              <Input
                placeholder='* Email Address'
                name='email'
                {...register('email')}
                error={errors && errors?.email?.message}
              />
              <Input
                placeholder='* Confirm Email Address'
                name='confirm_email'
                {...register('confirm_email')}
                error={errors && errors?.confirm_email?.message}
              />
              <Input
                placeholder='* First Name'
                name='first_name'
                {...register('first_name')}
                error={errors && errors?.first_name?.message}
              />
              <Input
                placeholder='* Last Name'
                name='last_name'
                {...register('last_name')}
                error={errors && errors?.last_name?.message}
              />
              <Input
                type='password'
                placeholder='* Set Password'
                name='password'
                {...register('password')}
                error={errors && errors?.password?.message}
              />
              <Input
                type='password'
                placeholder='* Confirm Password'
                name='confirm_password'
                {...register('confirm_password')}
                error={errors && errors?.confirm_password?.message}
              />
              <Input
                placeholder='Company Name / Project Name'
                name='company'
                {...register('company')}
                error={errors && errors?.company?.message}
              />
              <Input
                placeholder='Please tell us, what you will use your CSPR for?'
                rows={5}
                name='description'
                {...register('description')}
                error={errors && errors?.description?.message}
              />
              <Input
                placeholder='How many CSPR do you expect to use per month?'
                name='cspr_expectation'
                {...register('cspr_expectation')}
                error={errors && errors?.cspr_expectation?.message}
              />
              <Button type='submit' className='w-full' disabled={!isValid}>
                Submit
              </Button>
            </form>
            <div className='flex pt-4'>
              <p className='ml-auto'>
                Already have an account?
                <Link className='text-primary pl-1' to='/auth/login'>
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default SignUp;
