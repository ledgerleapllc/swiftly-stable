import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import QueryString from 'qs';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link, useHistory } from 'react-router-dom';
import { PATTERN } from 'shared/common/pattern';
import { AuthContainer } from 'shared/components/modules/AuthContainer';
import { useLoading } from 'shared/components/modules/Loading';
import { Button, Input } from 'shared/components/partials';
import { setTempToken } from 'shared/core/services/auth';
import { signUp } from 'stores/auth/actions';
import * as yup from 'yup';

const schemaStep1 = yup
  .object()
  .shape({
    entity_name: yup.string().required('Entity name is required'),
    entity_phone: yup.string().required('Entity Phone Number is required'),
    register_number: yup.string().required('Registration Number is required'),
    register_date: yup.string().required('Registration Date is required'),
    register_address: yup.string().required('Registered Entity Office Address is required'),
    apartment: yup.string().required('Apartment is required'),
    city: yup.string().required('City is required'),
    state: yup.string(),
    zipCode: yup.string(),
    country: yup.string().required('Country/Region of Registration is required'),
  })
  .required();

const schemaStep2 = yup
  .object()
  .shape({
    auth_name: yup.string().required('Authorized Name is required'),
    title: yup.string().required('Title is required'),
    email: yup.string().required().matches(PATTERN.EMAIL, 'Email address is invalid'),
    confirm_email: yup
      .string()
      .oneOf([yup.ref('email'), null], 'Email must match')
      .required('Confirm email is required'),
    phone_number: yup.string().required('Phone Number is required'),
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

const EntitySignUp = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState();
  const { setLoading } = useLoading();

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location.hash) {
      history.replace({
        hash: 'step1'
      });
    }
  }, []);

  useEffect(() => {
    if (location.hash === '#step1' && step !== 1) {
      setStep(1);
      return
    }
    if (location.hash === '#step2' && step !== 2) {
      setStep(2);
    }
  }, [location.hash]);

  const {
    handleSubmit: handleSubmitStep1,
    register: registerStep1,
    formState: { errors: errorStep1, isValid: isValidStep1 },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schemaStep1),
  });

  const {
    handleSubmit: handleSubmitStep2,
    register: registerStep2,
    formState: { errors: errorStep2, isValid: isValidStep2 },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schemaStep2),
  });

  const onSubmitStep1 = (params) => {
    setLoading(true);
    setData(params);
    history.push({
      hash: 'step2'
    });
    setStep(2);
    setLoading(false);
  };

  const onSubmitStep2 = (params) => {
    setLoading(true);
    dispatch(
      signUp(
        {
          ...data,
          ...params,
        },
        (res) => {
          setLoading(false);
          const { detail } = res;
          setTempToken(detail?.bearer);
          history.push({
            pathname: `/auth/verify-email/${detail.guid}`,
            search: QueryString.stringify({ email: data.email }),
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
      <AuthContainer className='entity-signup-page' maxWidth='max-w-[750px]' showInstruction>
        <div className='h-full flex flex-col'>
          <div className='flex justify-between pb-3'>
            <div>
              <h3 className='font-semibold'>Entity Sign Up</h3>
              <p className='pt-1 pb-3 text-xs'>
                {step === 1
                  ? 'Tell us a little about your business.'
                  : 'Now we need to gather some information about you.'}
              </p>
            </div>
            <div className='flex gap-1 mr-1'>
              <div
                className={classNames(
                  `transition ease-in-out border-solid w-2 h-2 rounded cursor-pointer ${step === 1 ? 'bg-primary' : 'bg-gray2'}`
                )}
              ></div>
              <div
                className={classNames(
                  `transition ease-in-out border-solid w-2 h-2 rounded cursor-pointer ${step === 2 ? 'bg-primary' : 'bg-gray2'}`
                )}
              ></div>
            </div>
          </div>
          <div className='-mx-12 flex-1 min-h-0 overflow-y-scroll'>
            <div className='px-12'>
              {step === 1 && (
                <form onSubmit={handleSubmitStep1(onSubmitStep1)}>
                  <div className='grid grid-cols-2 gap-4'>
                    <Input
                      placeholder='* Entity Name'
                      name='entity_name'
                      {...registerStep1('entity_name')}
                      error={errorStep1 && errorStep1?.entity_name?.message}
                    />
                    <Input
                      placeholder='* Entity Phone Number'
                      name='entity_phone'
                      {...registerStep1('entity_phone')}
                      error={errorStep1 && errorStep1?.entity_phone?.message}
                    />
                    <Input
                      placeholder='* Registration Number'
                      name='register_number'
                      {...registerStep1('register_number')}
                      error={errorStep1 && errorStep1?.register_number?.message}
                    />
                    <Input
                      placeholder='* Registration Date'
                      name='register_date'
                      {...registerStep1('register_date')}
                      error={errorStep1 && errorStep1?.register_date?.message}
                    />
                    <Input
                      placeholder='* Registered Entity Office Address'
                      name='register_address'
                      {...registerStep1('register_address')}
                      error={errorStep1 && errorStep1?.register_address?.message}
                    />
                    <Input
                      className='col-start-1 col-end-3'
                      placeholder='* Apartment, Suite, etc.'
                      name='apartment'
                      {...registerStep1('apartment')}
                      error={errorStep1 && errorStep1?.apartment?.message}
                    />
                    <Input
                      placeholder='* City'
                      name='city'
                      {...registerStep1('city')}
                      error={errorStep1 && errorStep1?.city?.message}
                    />
                    <Input
                      placeholder='State'
                      name='state'
                      {...registerStep1('state')}
                      error={errorStep1 && errorStep1?.state?.message}
                    />
                    <Input
                      placeholder='Zip Code'
                      name='zipCode'
                      {...registerStep1('zipCode')}
                      error={errorStep1 && errorStep1?.zipCode?.message}
                    />
                    <Input
                      placeholder='* Country/Region of Registration'
                      name='country'
                      {...registerStep1('country')}
                      error={errorStep1 && errorStep1?.country?.message}
                    />
                  </div>
                  <div className='mt-4'>
                    <Button type='submit' className='w-full' disabled={!isValidStep1}>
                      Next
                    </Button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleSubmitStep2(onSubmitStep2)}>
                  <div className='grid grid-cols-2 gap-4'>
                    <Input
                      placeholder='* Authorized Contact Name'
                      name='auth_name'
                      {...registerStep2('auth_name')}
                      error={errorStep2 && errorStep2?.auth_name?.message}
                    />
                    <Input
                      placeholder='* Title'
                      name='title'
                      {...registerStep2('title')}
                      error={errorStep2 && errorStep2?.title?.message}
                    />
                    <Input
                      placeholder='* Entity Email Address'
                      name='email'
                      {...registerStep2('email')}
                      error={errorStep2 && errorStep2?.email?.message}
                    />
                    <Input
                      placeholder='* Confirm Email Address'
                      name='confirm_email'
                      {...registerStep2('confirm_email')}
                      error={errorStep2 && errorStep2?.confirm_email?.message}
                    />
                    <Input
                      placeholder='* Contact Phone Number'
                      name='phone_number'
                      {...registerStep2('phone_number')}
                      error={errorStep2 && errorStep2?.phone_number?.message}
                    />
                    <div />
                    <Input
                      type='password'
                      placeholder='* Create password'
                      name='password'
                      {...registerStep2('password')}
                      error={errorStep2 && errorStep2?.password?.message}
                    />
                    <Input
                      type='password'
                      placeholder='* Confirm password'
                      name='confirmPassword'
                      {...registerStep2('confirm_password')}
                      error={errorStep2 && errorStep2?.confirm_password?.message}
                    />
                  </div>
                  <div className='mt-4'>
                    {step === 2 && (
                      <Button type='submit' className='w-full' disabled={!isValidStep2}>
                        Submit
                      </Button>
                    )}
                  </div>
                </form>
              )}

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

EntitySignUp.propTypes = {};

export default EntitySignUp;
