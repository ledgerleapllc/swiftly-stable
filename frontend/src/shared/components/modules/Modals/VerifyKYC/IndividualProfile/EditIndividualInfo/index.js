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
    address: yup.string().required('Address is required'),
    dateOfBirth: yup.string().required('Date of birth is required'),
  })
  .required();

const EditIndividualInfo = ({ close }) => {
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
    console.log(data);
    close && close();
  };

  const handleSave = () => {
    setSaved(true);
  };

  return (
    <>
      <Dialog.Body className='mt-7.5'>
        <Button size='md' color={isValid ? 'success' : 'primary'} onClick={() => isValid && handleSave()}>
          {isValid ? 'Save' : 'Edit Personal Info'}
        </Button>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 pt-4'>
          <div className='flex gap-4'>
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
          </div>
          <div className='flex gap-4'>
            <Input
              fullWidth
              placeholder='* Address'
              {...register('address')}
              error={errors && errors?.address?.message}
            />
            <Input
              type='date'
              fullWidth
              placeholder='* Date of birth'
              {...register('dateOfBirth')}
              error={errors && errors?.dateOfBirth?.message}
            />
          </div>
          <div>
            <p>I have confirmed that above data is accurate.</p>
          </div>
          <button type='submit' ref={submitBtn} hidden />
        </form>
      </Dialog.Body>
      <Dialog.Footer className='flex mt-9 justify-between gap-4'>
        <Button color='success' className='w-full' onClick={() => submitBtn.current.click()} disabled={!isSaved}>
          Start Verification
        </Button>
      </Dialog.Footer>
    </>
  );
};

export default EditIndividualInfo;
