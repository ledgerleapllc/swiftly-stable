import React, { useState } from 'react';
import { Dialog } from 'shared/components/partials/Dialog/Provider';
import StakeAndUnstakeAmount from './StakeAndUnstakeAmount';
import StakeAndUnstakePools from './StakeAndUnstakePools';

const StakeAndUnstake = ({ close, type }) => {
  const [step, setStep] = useState(1);
  const [selectedPool, setSelectedPool] = useState({
    id: 0,
    name: '',
    amount: '',
  });

  const handleSelectPool = (pool) => {
    setSelectedPool(pool);
  };

  const renderStacking = (step) => {
    switch (step) {
      case 1:
        return {
          title: type === 'stake' ? 'Quick Stake' : 'Unstake',
          subTitle:
            type === 'stake'
              ? 'How much do you want to remove from the staking pool?'
              : 'Which one of your existing pools would you like to stake to?',
          action: (
            <StakeAndUnstakePools
              type={type}
              selectedPool={selectedPool}
              onSelect={handleSelectPool}
              onConfirm={() => setStep(2)}
            />
          ),
        };
      default:
        return {
          title: type === 'stake' ? `Stacking to ${selectedPool.name}` : `Unstaking from ${selectedPool.name}`,
          subTitle:
            type === 'stake'
              ? 'How much do you want to stake?'
              : 'How much do you want to remove from the staking pool?',
          action: <StakeAndUnstakeAmount type={type} onConfirm={() => close()} />,
        };
    }
  };

  const STACKING = renderStacking(step);

  return (
    <Dialog className='py-7.5 px-12.5 min-w-207' showCloseBtn={false} close={close}>
      <Dialog.Header title={STACKING.title} subTitle={STACKING.subTitle} step={2} currentStep={step} />
      <Dialog.Body>{STACKING.action}</Dialog.Body>
    </Dialog>
  );
};

export default StakeAndUnstake;
