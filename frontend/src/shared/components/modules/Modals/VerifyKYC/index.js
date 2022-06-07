import React, { useState } from 'react';
import { Dialog } from 'shared/components/partials/Dialog/Provider';
import AskKYC from './AskKYC';
import BusinessInfo from './EntityProfile/BusinessInfo';
import EditEntityInfo from './EntityProfile/EditEntityInfo';
import EditIndividualInfo from './IndividualProfile/EditIndividualInfo';

const VerifyKYC = ({ type, close }) => {
  const [step, setStep] = useState(1);

  const renderKYC = (step) => {
    const title = type === 'individual' ? 'Verification Profile' : 'Entity Verification Profile';
    switch (step) {
      case 1:
        return {
          title,
          subTitle:
            'Do you represent an entity such as a company, trust, llc, non-profit, or another type of organization?',
          action: <AskKYC onConfirm={() => setStep(2)} />,
        };
      case 2:
        return {
          title,
          subTitle:
            type === 'individual'
              ? 'Confirm that the following information is accurate to begin verification. You can make edits if needed.'
              : 'Because you represent an entity, we need to run verification on your business. If you continue, the personal information submitted during registration will be converted to contact person data on behalf of the business you are representing. Please complete the form to continue the verification.',
          action:
            type === 'individual' ? (
              <EditIndividualInfo close={() => close()} />
            ) : (
              <EditEntityInfo onConfirm={() => setStep(3)} />
            ),
        };

      case 3:
        return {
          title,
          subTitle:
            type !== 'individual' &&
            'Lastly we need to collect some information about your business. Please complete the form to continue the verification.',
          action: <BusinessInfo close={() => close()} />,
        };
      default:
        break;
    }
  };

  const KYC = renderKYC(step);

  return (
    <Dialog className='py-7.5 px-12.5 min-w-207' showCloseBtn={false} close={close}>
      <Dialog.Header
        title={KYC.title}
        subTitle={KYC.subTitle}
        step={type === 'individual' ? 2 : 3}
        currentStep={step}
      />
      <Dialog.Body>{KYC.action}</Dialog.Body>
    </Dialog>
  );
};

export default VerifyKYC;
