import { yupResolver } from '@hookform/resolvers/yup';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { PATTERN } from 'shared/common/pattern';
import { Button, Input } from 'shared/components/partials';
import { Dialog, useDialog } from 'shared/components/partials/Dialog/Provider';
import { updateEmail } from 'stores/api/shared/actions';
import * as yup from 'yup';
import VerifyAdminModal from '../Verify';

const schema = yup
  .object()
  .shape({
    email: yup.string().required().matches(PATTERN.EMAIL, 'Email address is invalid'),
    confirm_email: yup
      .string()
      .oneOf([yup.ref('email'), null], 'Email must match')
      .required(),
  })
  .required();

const UpdateEmailAdminModal = ({ verifyCode, close }) => {
  const submitBtn = useRef();
  const dispatch = useDispatch();

  const { appendDialog } = useDialog();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(
      updateEmail(
        {
          new_email: data.confirm_email,
          mfa_code: verifyCode,
        },
        () => {
          close();
          appendDialog(<VerifyAdminModal step={2} type='updateEmailComplete' email={data.confirm_email} />);
        }
      )
    );
  };

  const handleCancel = () => {
    close();
  };

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header
        title='Update Email Address'
        subTitle='This will change the email address associated with your account.'
      />
      <Dialog.Body className='pt-6.25'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder='New Email Address'
            name='email'
            {...register('email')}
            error={errors && errors?.email?.message}
          />
          <Input
            className='mt-5'
            placeholder='Confirm New Email Address'
            name='confirm_email'
            {...register('confirm_email')}
            error={errors && errors?.confirm_email?.message}
          />
          <button type='submit' ref={submitBtn} hidden />
        </form>
      </Dialog.Body>
      <Dialog.Footer className='mt-12.5'>
        <Button className='w-full' color='primary' disabled={!isValid} onClick={() => submitBtn.current.click()}>
          Submit
        </Button>
        <div className='mt-2.5 text-center'>
          <Button variant='text' className=' text-primary underline' onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Dialog.Footer>
    </Dialog>
  );
};

export default UpdateEmailAdminModal;
