import { ReactComponent as Shield } from 'assets/icons/shield.svg';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import VerifyKYC from '../../Modals/VerifyKYC';
import styles from './style.module.scss';

const MyKYCStatus = () => {
  const { appendDialog } = useDialog();

  const [verifyKYC, setVerifyKYC] = useState({
    status: 0,
    type: 'entity', // individual or entity
  });

  const handleVerify = () => {
    appendDialog(<VerifyKYC type={verifyKYC.type} />);
  };

  const renderKYC = (status) => {
    switch (status) {
      case 1:
        return {
          text: 'Pending',
          action: 'Your KYC/AML status is verified! You can now stake to yield pools.',
          color: 'text-primary',
        };
      case 2:
        return {
          text: 'Verified',
          action: 'Your KYC/AML status is verified! You can now stake to yield pools.',
          color: 'text-success',
        };
      default:
        return {
          text: 'Not Verified',
          action: (
            <Button className='px-8' size='sm' onClick={handleVerify}>
              Get Verified
            </Button>
          ),
        };
    }
  };

  const KYC = renderKYC(verifyKYC.status);

  return (
    <Card>
      <CardHeader icon={<Shield />} title='My KYC/AML Status' />
      <CardBody noSpacing>
        <div className={styles.blockItem}>
          <p className={classNames('text-7', KYC.color)}>{KYC.text}</p>
          <div className='mt-2.5 text-xs'>{KYC.action}</div>
        </div>
      </CardBody>
    </Card>
  );
};

export default MyKYCStatus;
