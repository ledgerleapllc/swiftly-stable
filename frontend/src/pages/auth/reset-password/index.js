import { yupResolver } from '@hookform/resolvers/yup';
import { ReactComponent as Checkmark } from 'assets/icons/checkmark.svg';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { PATTERN } from 'shared/common/pattern';
import { AuthContainer } from 'shared/components/modules/AuthContainer';
import { useLoading } from 'shared/components/modules/Loading';
import { Button, Input } from 'shared/components/partials';
import { useQuery } from 'shared/hooks/useQuery';
import { resetPassword } from 'stores/auth/actions';
import * as yup from 'yup';
import style from './style.module.scss';

const schema = yup
  .object()
  .shape({
    password: yup.string().matches(PATTERN.PASSWORD, '').required(),
    new_password: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Confirm password must match')
      .required(),
  })
  .required();

function ResetPassword() {
  const { setLoading } = useLoading();

  const {
    handleSubmit,
    register,
    watch,
    formState: { isValid },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      new_password: '',
    },
  });

  const watchPassword = watch('password');

  const dispatch = useDispatch();
  const params = useParams();
  const query = useQuery();
  const history = useHistory();

  const onSubmit = (data) => {
    const email = query.get('email').replace(' ', '+');
    setLoading(true);
    dispatch(
      resetPassword(
        { ...data, hash: params.hash, email },
        () => {
          setLoading(false);
          history.push('/auth/login');
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const checkValidMin = () => {
    return watchPassword?.length >= 8;
  };

  const checkValidLetter = () => {
    return PATTERN.PASSWORD_LETTER.test(watchPassword);
  };

  const checkValidNumber = () => {
    return PATTERN.PASSWORD_NUMBER.test(watchPassword);
  };

  const checkValidUpperCase = () => {
    return PATTERN.PASSWORD_UPPERCASE.test(watchPassword);
  };

  const checkValidSpecialCharacters = () => {
    return PATTERN.PASSWORD_SPECICAL_CHARACTERS.test(watchPassword);
  };

  return (
    <AuthContainer className='login-page' showInstruction>
      <div className='pb-6'>
        <h3 className='font-semibold'>Set New Password</h3>
        <p>for {query.get('email').replace(' ', '+')}</p>
        <ul className='pt-5 flex flex-col gap-y-3'>
          <li className={`flex items-center gap-x-3 ${checkValidMin() && style.success}`}>
            <Checkmark className={`text-xs ${style.icon} text-gray2`} />
            <p className={style.text}>Min 8 characters</p>
          </li>
          <li className={`flex items-center gap-x-3 ${checkValidLetter() && style.success}`}>
            <Checkmark className={`text-xs ${style.icon} text-gray2`} />
            <p className={style.text}>1 Letter</p>
          </li>
          <li className={`flex items-center gap-x-3 ${checkValidNumber() && style.success}`}>
            <Checkmark className={`text-xs ${style.icon} text-gray2`} />
            <p className={style.text}>1 Number</p>
          </li>
          <li className={`flex items-center gap-x-3 ${checkValidUpperCase() && style.success}`}>
            <Checkmark className={`text-xs ${style.icon} text-gray2`} />
            <p className={style.text}>1 Letter Uppercase</p>
          </li>
          <li className={`flex items-center gap-x-3 ${checkValidSpecialCharacters() && style.success}`}>
            <Checkmark className={`text-xs ${style.icon} text-gray2`} />
            <p className={style.text}>1 Special Characters</p>
          </li>
        </ul>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-5'>
        <Input type='password' placeholder='New Password' name='password' {...register('password')} />
        <Input type='password' placeholder='Confirm Password' name='new_password' {...register('new_password')} />
        <Button type='submit' className='w-full' disabled={!isValid}>
          Set New Password
        </Button>
      </form>
    </AuthContainer>
  );
}

export default ResetPassword;
