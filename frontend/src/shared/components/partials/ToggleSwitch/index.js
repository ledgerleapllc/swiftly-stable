import classNames from 'classnames';
import React, { forwardRef, useEffect, useState } from 'react';
import styles from './style.module.scss';

const ToggleSwitch = forwardRef(({ checked, disableChange = false, ...other }, ref) => {
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  const handleChecked = () => {
    !disableChange && setChecked(!isChecked);
  };
  return (
    <div>
      <label className={styles.btnSwitch} htmlFor='toggle-wrapper'>
        <input ref={ref} {...other} type='checkbox' id='toggle-wrapper' className='sr-only' checked={isChecked} />
        <div
          className={classNames(styles.toggle, {
            [styles.active]: isChecked,
          })}
          onClick={handleChecked}
        ></div>
      </label>
      <p className='mt-3 text-primary font-semibold'>{isChecked ? 'On' : 'Off'}</p>
    </div>
  );
});

export default ToggleSwitch;
