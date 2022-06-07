import classNames from 'classnames';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import styles from './style.module.scss';

const Pool = ({ isActive = false }) => {
  const [data] = useState([
    {
      text: 'Annualized Yield',
      value: '10%',
    },
    {
      text: 'Lockup Period',
      value: '90 Days',
    },
    {
      text: 'Minimum Stake',
      value: '100,000',
    },
    {
      text: 'Total in Pool',
      value: '135,100,000',
    },
  ]);
  return (
    <Card>
      <CardHeader
        className='bg-primary'
        icon={<div className='bg-success w-2 h-2 rounded-full' />}
        title={<p className='text-white'>Pool: 001</p>}
      >
        <p className='text-white'>Created: 2022-03-31</p>
      </CardHeader>
      <CardBody noSpacing>
        <div className='flex'>
          {data.map((item, index) => (
            <div key={index} className={styles.blockItem}>
              <p className='font-light text-3.25'>{item.text}</p>
              <p className={classNames('text-7')}>{item.value}</p>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default Pool;
