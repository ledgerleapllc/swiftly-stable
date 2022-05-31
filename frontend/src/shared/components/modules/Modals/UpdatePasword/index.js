import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { PATTERN } from 'shared/common/pattern';
import { Button, Input } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';
import { updatePassword } from 'stores/api/shared/actions';
import * as yup from 'yup';

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

const UpdatePasswordAdminModal = ({ verifyCode, close }) => {
  const submitBtn = useRef();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      new_password: '',
    },
  });

  const onSubmit = (data) => {
    dispatch(
      updatePassword({ ...data, new_password: data.new_password, mfa_code: verifyCode }, (res) => {
        close();
      })
    );
  };

  const handleCancel = () => {
    close();
  };

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header title='Update Password' subTitle='This will change the password associated with your account.' />
      <Dialog.Body className='pt-6.25'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
          <Input
            type='password'
            placeholder='New Password'
            name='new_password'
            {...register('password')}
            error={errors && errors?.password?.message}
          />
          <Input
            type='password'
            placeholder='Confirm New Password'
            name='new_password'
            {...register('new_password')}
            error={errors && errors?.new_password?.message}
          />
          <button type='submit' ref={submitBtn} hidden />
        </form>
      </Dialog.Body>
      <Dialog.Footer className='mt-12.5'>
        <Button className='w-full' color='primary' onClick={() => submitBtn.current.click()} disabled={!isValid}>
          Complete Password Change
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

export default UpdatePasswordAdminModal;
