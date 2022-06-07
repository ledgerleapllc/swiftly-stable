import { yupResolver } from '@hookform/resolvers/yup';
import { default as React, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    name: yup.string().required('Entity Name is required'),
    phone: yup.string().required('Entity Phone Number is required'),
    number: yup.string().required('Registration Number is required'),
    date: yup.string().required('Registration Date is required'),
    address: yup.string().required('Registered Entity Office Address is required'),
    city: yup.string().required('City is required'),
    state: yup.string(),
    code: yup.string(),
    country: yup.string().required('Country/Region of Registration is required'),
  })
  .required();

const BusinessInfo = ({ close }) => {
  const submitBtn = useRef();

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
    close();
  };

  return (
    <>
      <Dialog.Body className='mt-7.5'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 pt-4'>
          <div className='grid grid-cols-2 gap-4'>
            <Input
              fullWidth
              placeholder='* Entity Name'
              {...register('name')}
              error={errors && errors?.name?.message}
            />
            <Input
              fullWidth
              placeholder='* Entity Phone Number'
              {...register('phone')}
              error={errors && errors?.phone?.message}
            />
            <Input
              fullWidth
              placeholder='* Registration Number'
              {...register('number')}
              error={errors && errors?.number?.message}
            />
            <Input
              fullWidth
              placeholder='* Registration Date'
              {...register('date')}
              error={errors && errors?.date?.message}
            />
          </div>
          <div>
            <Input
              fullWidth
              placeholder='* Registered Entity Office Address'
              {...register('address')}
              error={errors && errors?.address?.message}
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <Input fullWidth placeholder='* City' {...register('city')} error={errors && errors?.city?.message} />
            <Input fullWidth placeholder='State' {...register('state')} error={errors && errors?.state?.message} />
            <Input fullWidth placeholder='Zip Code' {...register('code')} error={errors && errors?.code?.message} />
            <Input
              fullWidth
              placeholder='* Country/Region of Registration'
              {...register('country')}
              error={errors && errors?.country?.message}
            />
          </div>
          <button type='submit' ref={submitBtn} hidden />
        </form>
      </Dialog.Body>
      <Dialog.Footer className='flex mt-9 justify-between gap-4'>
        <Button color='success' className='w-full' onClick={() => submitBtn.current.click()} disabled={!isValid}>
          Start Verification
        </Button>
      </Dialog.Footer>
    </>
  );
};

export default BusinessInfo;
