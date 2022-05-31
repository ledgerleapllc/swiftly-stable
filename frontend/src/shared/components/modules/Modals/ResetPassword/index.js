import { yupResolver } from '@hookform/resolvers/yup';
import { ReactComponent as Checkmark } from 'assets/icons/checkmark.svg';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { PATTERN } from 'shared/common/pattern';
import { Button, Input } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';
import { resetUserPassword } from 'stores/api/admin/actions';
import * as yup from 'yup';
import styles from './style.module.scss';

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

const ResetPasswordModal = ({ close, guid }) => {
  const submitBtn = useRef();
  const dispatch = useDispatch();

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

  const onSubmit = (data) => {
    dispatch(
      resetUserPassword({ ...data, guid }, (res) => {
        toast.success(res.detail);
        close();
      })
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

  const handleCancel = () => {
    close();
  };

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header title='Set New Password' subTitle='for [user email address]' />
      <Dialog.Body>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.resetPasswordForm}>
          <ul className='pt-5 flex flex-col gap-y-3'>
            <li className={`flex items-center gap-x-3 ${checkValidMin() && styles.success}`}>
              <Checkmark className={`text-xs ${styles.icon} text-gray2`} />
              <p className={styles.text}>Min 8 characters</p>
            </li>
            <li className={`flex items-center gap-x-3 ${checkValidLetter() && styles.success}`}>
              <Checkmark className={`text-xs ${styles.icon} text-gray2`} />
              <p className={styles.text}>1 Letter</p>
            </li>
            <li className={`flex items-center gap-x-3 ${checkValidNumber() && styles.success}`}>
              <Checkmark className={`text-xs ${styles.icon} text-gray2`} />
              <p className={styles.text}>1 Number</p>
            </li>
            <li className={`flex items-center gap-x-3 ${checkValidUpperCase() && styles.success}`}>
              <Checkmark className={`text-xs ${styles.icon} text-gray2`} />
              <p className={styles.text}>1 Letter Uppercase</p>
            </li>
            <li className={`flex items-center gap-x-3 ${checkValidSpecialCharacters() && styles.success}`}>
              <Checkmark className={`text-xs ${styles.icon} text-gray2`} />
              <p className={styles.text}>1 Special Characters</p>
            </li>
          </ul>
          <div className='mt-6.25 flex flex-col gap-y-2.5'>
            <Input type='password' placeholder='Password' name='password' {...register('password')} />
            <Input type='password' placeholder='Confirm Password' name='new_password' {...register('new_password')} />
          </div>
          <button type='submit' ref={submitBtn} hidden />
        </form>
      </Dialog.Body>
      <Dialog.Footer>
        <Button className='w-full mt-6' color='primary' onClick={() => submitBtn.current.click()} disabled={!isValid}>
          Set New Password
        </Button>
        <div className='mt-2.5 text-center'>
          <Button variant='text' className='underline' onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Dialog.Footer>
    </Dialog>
  );
};

export default ResetPasswordModal;
