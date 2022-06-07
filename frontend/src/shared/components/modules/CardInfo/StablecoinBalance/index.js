import { ReactComponent as ArrowDown } from 'assets/icons/arrow-down.svg';
import { ReactComponent as ArrowUp } from 'assets/icons/arrow-up.svg';
import { ReactComponent as Coins } from 'assets/icons/coins.svg';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import BuyMore from '../../Modals/BuyMore';
import StakeAndUnstake from '../../Modals/StakeAndUnstake';
import styles from './style.module.scss';

const StablecoinBalance = ({ isActive = false }) => {
  const { appendDialog } = useDialog();

  const handleActivity = (type) => {
    switch (type) {
      case 'stake':
        appendDialog(<StakeAndUnstake type={type} />);
        break;
      case 'unstake':
        appendDialog(<StakeAndUnstake type={type} />);
        break;
      case 'buyMore':
        appendDialog(<BuyMore />);
        break;
      default:
        break;
    }
  };

  const [data] = useState([
    {
      text: 'Unstaked Balance',
      value: '5000',
      activity: (
        <Button size='sm' className='px-7' onClick={() => handleActivity('stake')}>
          <div className='flex gap-2 items-center py-1'>
            <ArrowUp />
            Quick Stake
          </div>
        </Button>
      ),
    },
    {
      text: 'Staked Balance',
      value: '2700',
      activity: (
        <Button size='sm' className='px-7' onClick={() => handleActivity('unstake')}>
          <div className='flex gap-2 items-center py-1'>
            <ArrowDown />
            Unstake
          </div>
        </Button>
      ),
    },
    {
      text: 'Total Balance',
      value: '21,000',
      activity: (
        <Button size='sm' className='px-7' onClick={() => handleActivity('buyMore')}>
          <div className='flex gap-2 items-center py-1'>Buy More</div>
        </Button>
      ),
    },
  ]);
  return (
    <Card>
      <CardHeader icon={<Coins />} title='My Stablecoin Balance'>
        {!isActive && (
          <Button size='sm' className='px-7'>
            Buy More
          </Button>
        )}
      </CardHeader>
      <CardBody noSpacing>
        <div className='flex'>
          {data.map((item, index) => (
            <div key={index} className={styles.blockItem}>
              <p
                className={classNames('text-7', {
                  'text-primary': index === 2,
                })}
              >
                {item.value}
              </p>
              <p className='font-light text-3.25'>{item.text}</p>
              {isActive && <div>{item.activity}</div>}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default StablecoinBalance;
