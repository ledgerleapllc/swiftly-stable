import classNames from 'classnames';
import React from 'react';

const Progress = ({ percent, className }) => {
  return (
    <div className={classNames('w-full bg-gray-200 rounded-full h-2.5', className)}>
      <div className='w-0 bg-primary h-2.5 rounded-full transition-all duration-300 ease-in-out' style={{ width: `${percent}%` }} />
    </div>
  );
};

export default Progress;
