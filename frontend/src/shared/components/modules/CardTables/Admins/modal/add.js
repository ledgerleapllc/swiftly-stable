import { yupResolver } from '@hookform/resolvers/yup';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { PATTERN } from 'shared/common/pattern';
import { Button, Input } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';
import { createAdmin } from 'stores/api/admin/actions';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    email: yup.string().matches(PATTERN.EMAIL, 'Email address is invalid').required(),
  })
  .required();

const AddAdminModal = ({ close }) => {
  const submitBtn = useRef();

  const [loading, setLoading] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    setLoading(true);
    dispatch(
      createAdmin(
        { email: data.email },
        () => {
          setLoading(false);
          close(true);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header title='Add New Admin' subTitle='What is the admin’s email address?' />
      <Dialog.Body className='pt-6.25'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder='Email Address' {...register('email')} error={errors && errors?.email?.message} />
          <button type='submit' ref={submitBtn} hidden />
        </form>
      </Dialog.Body>
      <Dialog.Footer className='mt-6'>
        <Button
          className='w-full'
          color='success'
          onClick={() => submitBtn.current.click()}
          disabled={!isValid || loading}
        >
          Send Invite
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
};

export default AddAdminModal;
