import { ReactComponent as Key } from 'assets/icons/key.svg';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader } from 'shared/components/partials';
import styles from './style.module.scss';

const StablecoinBalance = () => {
  const [data, setData] = useState([
    {
      text: 'Unstaked Balance',
      value: '5000',
    },
    {
      text: 'Staked Balance',
      value: '2700',
    },
    {
      text: 'Total Balance',
      value: '21,000',
    },
  ]);
  return (
    <Card>
      <CardHeader icon={<Key />} title='My Stablecoin Balance'>
        <Button size='sm' className='px-7'>
          Buy More
        </Button>
      </CardHeader>
      <CardBody noSpacing>
        <div className='flex'>
          {data &&
            data.length > 0 &&
            data.map((item, index) => (
              <div key={index} className={styles.blockItem}>
                <p
                  className={classNames('text-7', {
                    'text-primary': index === 2,
                  })}
                >
                  {item.value}
                </p>
                <p className='font-light text-3.25'>{item.text}</p>
              </div>
            ))}
        </div>
      </CardBody>
    </Card>
  );
};

StablecoinBalance.propTypes = {};

export default StablecoinBalance;
