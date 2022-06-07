import React, { useState } from 'react';
import { Dialog } from 'shared/components/partials/Dialog/Provider';
import { calcStablecoinRate } from 'shared/core/utils';
import OrderCreated from './OrderCreated';
import PaymentType from './PaymentType';
import PurchaseAmount from './PurchaseAmount';
import VerifyOrder from './VerifyOrder';

const BuyMore = ({ close }) => {
  const [step, setStep] = useState(1);

  const [selectedType, setSelectedType] = useState({
    id: 0,
    name: '',
    symbol: '',
    price: 0,
    stablecoinAmount: 0,
    amountDue: 0,
  });

  const handleSelectType = (type) => {
    type && setSelectedType(type);
  };

  const handlePurchaseAmount = (stablecoinAmount) => {
    setSelectedType({
      ...selectedType,
      stablecoinAmount,
      amountDue: calcStablecoinRate(stablecoinAmount, selectedType.price),
    });
    setStep(3);
  };

  const renderPayment = (step) => {
    switch (step) {
      case 1:
        return {
          title: 'Buy more',
          subTitle: 'Select a payment type.',
          action: (
            <PaymentType selectedType={selectedType} onSelected={handleSelectType} onConfirm={() => setStep(2)} />
          ),
        };
      case 2:
        return {
          title: 'How many stablecoin do you want to purchase?',
          subTitle:
            selectedType?.symbol === 'USD'
              ? 'The system will calculate the total amount.'
              : `The system will calculate how much ${selectedType.symbol} you will need.`,
          action: <PurchaseAmount selectedType={selectedType} onConfirm={handlePurchaseAmount} />,
        };
      case 3:
        return {
          title: 'Order summary',
          subTitle: 'Verify everything is correct before placing your order.',
          action: <VerifyOrder selectedType={selectedType} onConfirm={() => setStep(4)} />,
        };
      default:
        return {
          title: 'Your order has been created!',
          subTitle: selectedType?.symbol === 'USD' && (
            <>
              Amount to wire: <strong>${selectedType.amountDue} USD</strong>
            </>
          ),
          action: <OrderCreated selectedType={selectedType} onConfirm={() => close()} />,
        };
    }
  };

  const PAYMENT = renderPayment(step);

  return (
    <Dialog className='py-7.5 px-12.5 min-w-207' showCloseBtn={false} close={close}>
      <Dialog.Header title={PAYMENT.title} subTitle={PAYMENT.subTitle} />
      <Dialog.Body className='mt-7.5'>{PAYMENT.action}</Dialog.Body>
      <Dialog.Footer step={4} currentStep={step} />
    </Dialog>
  );
};

export default BuyMore;
