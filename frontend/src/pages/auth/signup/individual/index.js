import { yupResolver } from '@hookform/resolvers/yup';
import qs from 'qs';
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

const schema = yup
  .object()
  .shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    email: yup.string().required().matches(PATTERN.EMAIL, 'Email address is invalid'),
    confirm_email: yup
      .string()
      .oneOf([yup.ref('email'), null], 'Email must match')
      .required('Confirm email is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    address: yup.string().required('Address is required'),
    apartment: yup.string().required('Apartment, Suite, ect.. is required'),
    city: yup.string().required('City is required'),
    state: yup.string(),
    zipCode: yup.string(),
    country: yup.string().required('Country is required'),
    citizenship: yup.string().required('Citizenship is required'),
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
      .required('Confirm password is required'),
  })
  .required();

const IndividualSignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
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
    <>
      <AuthContainer className='individual-signup-page' maxWidth='max-w-[750px]' showInstruction>
        <div className='h-full flex flex-col'>
          <div className='pb-3'>
            <h3 className='font-semibold'>Individual Sign Up</h3>
          </div>
          <div className='-mx-12 flex-1 min-h-0 overflow-y-scroll'>
            <div className='px-12'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-2 gap-4'>
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
                    placeholder='* Phone Number'
                    name='phoneNumber'
                    {...register('phoneNumber')}
                    error={errors && errors?.phoneNumber?.message}
                  />
                  <div />
                  <Input
                    placeholder='* Address'
                    name='address'
                    {...register('address')}
                    error={errors && errors?.address?.message}
                  />
                  <Input
                    className='col-start-1 col-end-3'
                    placeholder='* Apartment, Suite, etc.'
                    name='apartment'
                    {...register('apartment')}
                    error={errors && errors?.apartment?.message}
                  />
                  <Input
                    placeholder='* City'
                    name='city'
                    {...register('city')}
                    error={errors && errors?.city?.message}
                  />
                  <Input
                    placeholder='State'
                    name='state'
                    {...register('state')}
                    error={errors && errors?.state?.message}
                  />
                  <Input
                    placeholder='Zip Code'
                    name='zipCode'
                    {...register('zipCode')}
                    error={errors && errors?.zipCode?.message}
                  />
                  <Input
                    placeholder='* Country/Region'
                    name='country'
                    {...register('country')}
                    error={errors && errors?.country?.message}
                  />
                  <Input
                    placeholder='* Country of Citizenship'
                    name='citizenship'
                    {...register('citizenship')}
                    error={errors && errors?.citizenship?.message}
                  />
                  <div />
                  <Input
                    type='password'
                    placeholder='* Create password'
                    name='password'
                    {...register('password')}
                    error={errors && errors?.password?.message}
                  />
                  <Input
                    type='password'
                    placeholder='* Confirm password'
                    name='confirmPassword'
                    {...register('confirm_password')}
                    error={errors && errors?.confirm_password?.message}
                  />
                </div>
                <Button type='submit' className='w-full mt-4'>
                  Submit
                </Button>
              </form>
              <div className='text-center mt-4'>
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
    </>
  );
};

IndividualSignUp.propTypes = {};

export default IndividualSignUp;
