import { ReactComponent as Key } from 'assets/icons/key.svg';
import React from 'react';
import { Button, Card, CardBody, CardHeader } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import VerifyKYC from '../../Modals/VerifyKYC';
import styles from './style.module.scss';

const KYCStatus = () => {
  const { appendDialog } = useDialog();

  const handleVerify = () => {
    appendDialog(<VerifyKYC />);
  };

  return (
    <Card>
      <CardHeader icon={<Key />} title='My KYC Status' />
      <CardBody noSpacing>
        <div className='flex'>
          <div className={styles.blockItem}>
            <p className='text-7 font-normal'>Not Verified</p>
            <Button className='px-8' size='sm' onClick={handleVerify}>
              Get Verified
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

KYCStatus.propTypes = {};

export default KYCStatus;
