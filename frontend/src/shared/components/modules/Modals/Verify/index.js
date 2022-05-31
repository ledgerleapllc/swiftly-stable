import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input } from 'shared/components/partials';
import { Dialog, useDialog } from 'shared/components/partials/Dialog/Provider';
import { confirmUpdateEmail, sendMFA, updateMFA } from 'stores/api/shared/actions';
import { confirmMFA } from 'stores/auth/actions';
import UpdateEmailAdminModal from '../UpdateEmail';
import UpdatePasswordAdminModal from '../UpdatePasword';

const VerifyAdminModal = ({ close, step = 1, type, active2fa, email }) => {
  const [code, setCode] = useState('');

  const dispatch = useDispatch();
  const { appendDialog } = useDialog();

  const handleChangeVerifyCode = (e) => {
    setCode(e.target.value);
  };

  const handleResendCode = () => {
    dispatch(sendMFA());
  };

  const handleVerify = () => {
    if (step === 2) {
      dispatch(
        confirmUpdateEmail({ mfa_code: code, email }, () => {
          close();
        })
      );
    } else {
      dispatch(
        confirmMFA({ mfa_code: code }, () => {
          if (type === 'updateEmail') {
            close();
            appendDialog(<UpdateEmailAdminModal verifyCode={code} />);
          }
          if (type === 'updatePassword') {
            close();
            appendDialog(<UpdatePasswordAdminModal verifyCode={code} />);
          }
          if (type === '2fa') {
            dispatch(
              updateMFA({ mfa_code: code, active: !active2fa }, () => {
                close();
              })
            );
          }
        })
      );
    }
  };

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header
        title='Second Step Verification'
        subTitle={
          step === 1
            ? `To change this setting we must verify your identity. To make sure your account is secure, we sent a 2fa
            verification code to your inbox.`
            : `To complete this change, we have to verify your identity. We sent a 2fa verification code to your NEW email address.`
        }
      />
      <Dialog.Body className='pt-6.25'>
        <Input value={code} placeholder='Enter Verification Code' onChange={handleChangeVerifyCode} />
      </Dialog.Body>
      <Dialog.Footer className='mt-6'>
        <Button className='w-full' color='primary' disabled={!code} onClick={handleVerify}>
          {step === 1 ? `Verify` : `Complete Email Change`}
        </Button>
        <div className='text-right'>
          <Button variant='text' className='mt-4' onClick={handleResendCode}>
            Resend Code
          </Button>
        </div>
      </Dialog.Footer>
    </Dialog>
  );
};

export default VerifyAdminModal;
