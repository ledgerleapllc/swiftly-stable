import { yupResolver } from '@hookform/resolvers/yup';
import { ReactComponent as CheckBox } from 'assets/icons/check-box.svg';
import { ReactComponent as UnCheckBox } from 'assets/icons/uncheck-box.svg';
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

const AddPoolModal = ({ close }) => {
  const [isChecked, setIsChecked] = useState(false);
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
      <Dialog.Header
        title='Create a New Pool'
        subTitle='Set the details you want applied to the pool you are creating.'
      />
      <Dialog.Body className='pt-6.25'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-4 gap-4'>
            <div className='col-span-4'>
              <Input placeholder='* Annualized Yield' {...register('email')} error={errors && errors?.email?.message} />
            </div>
            <div className='col-span-4'>
              <Input
                placeholder='* Minimum Stake Amount'
                {...register('email')}
                error={errors && errors?.email?.message}
              />
            </div>
            <div className='col-span-1'>
              <Input placeholder='* Lockup' {...register('email')} error={errors && errors?.email?.message} />
            </div>
            <div className='col-span-3'>
              <select className='outline outline-gray2 outline-1 py-3 px-4 text-3.25 bg-gray1 w-full' value={1}>
                <option value={1}>Pool Number</option>
                <option value={2}>{2}</option>
                <option value={3}>{3}</option>
              </select>
            </div>
          </div>

          <button className='flex gap-2 pt-7.5 pb-6.25 text-sm items-center ' onClick={() => setIsChecked(!isChecked)}>
            {isChecked ? <CheckBox /> : <UnCheckBox />}
            <p>I have read and agree to the terms of use.</p>
          </button>
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
          Next
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
};

export default AddPoolModal;
