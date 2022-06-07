import { yupResolver } from '@hookform/resolvers/yup';
import { default as React, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    title: yup.string().required('Title is required'),
  })
  .required();

const EditEntityInfo = ({ onConfirm }) => {
  const submitBtn = useRef();
  const [isSaved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    onConfirm && onConfirm();
  };

  const handleSave = () => {
    setSaved(true);
  };

  return (
    <>
      <Dialog.Body className='mt-7.5'>
        <Button size='md' color={isValid ? 'success' : 'primary'} onClick={() => isValid && handleSave()}>
          {isValid ? 'Save' : 'Edit Contact Info'}
        </Button>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 pt-4'>
          <div className='grid grid-cols-2 gap-4'>
            <Input
              fullWidth
              placeholder='* First Name'
              {...register('firstName')}
              error={errors && errors?.firstName?.message}
            />
            <Input
              fullWidth
              placeholder='* Last Name'
              {...register('lastName')}
              error={errors && errors?.lastName?.message}
            />
            <Input fullWidth placeholder='* Title' {...register('title')} error={errors && errors?.title?.message} />
          </div>
          <button type='submit' ref={submitBtn} hidden />
        </form>
      </Dialog.Body>
      <Dialog.Footer className='flex mt-9 justify-between gap-4'>
        <Button color='success' className='w-full' onClick={() => submitBtn.current.click()} disabled={!isSaved}>
          Next
        </Button>
      </Dialog.Footer>
    </>
  );
};

export default EditEntityInfo;
