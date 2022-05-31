import { ReactComponent as SettingsIcon } from 'assets/icons/settings-ic.svg';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import ToggleSwitch from 'shared/components/partials/ToggleSwitch';
import { sendMFA } from 'stores/api/shared/actions';
import VerifyAdminModal from '../../Modals/Verify';
import styles from './style.module.scss';

const GeneralSettings = () => {
  const user = useSelector((state) => state.authReducer?.user);

  const dispatch = useDispatch();

  const { appendDialog } = useDialog();

  const handleShowModal = (type) => {
    switch (type) {
      case 'updateEmail':
      case 'updatePassword':
      case '2fa':
        dispatch(
          sendMFA(null, () => {
            appendDialog(<VerifyAdminModal active2fa={user?.twofa === '1'} email={user?.email} type={type} />);
          })
        );
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Card className='max-w-4xl'>
        <CardHeader icon={<SettingsIcon />} title={`${user?.role === 'admin' ? 'Admin' : ''} Settings`} />
        <CardBody noSpacing>
          <div className='flex'>
            <div className={styles.blockItem}>
              <p>Email</p>
              <p className='font-semibold'>{user?.email}</p>
              <Button size='xs' className='rounded-full' onClick={() => handleShowModal('updateEmail')}>
                Update
              </Button>
            </div>
            <div className={styles.blockItem}>
              <p>Password</p>
              <p className='font-semibold'>******************</p>
              <Button size='xs' className='rounded-full' onClick={() => handleShowModal('updatePassword')}>
                Update
              </Button>
            </div>
            <div className={styles.blockItem}>
              <p>2fa Protection</p>
              <ToggleSwitch checked={user?.twofa === '1'} onChange={() => handleShowModal('2fa')} disableChange />
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default GeneralSettings;
