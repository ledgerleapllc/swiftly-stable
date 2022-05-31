import React, { createElement, useState } from 'react';
import { ReactComponent as Hide } from 'assets/icons/eye-slash.svg';
import { ReactComponent as Show } from 'assets/icons/eye.svg';
import style from './style.module.scss';

export const Input = React.forwardRef(({ type, error, rows, ...rest }, ref) => {
  const [isShow, setIsShow] = useState(false);

  const renderTogglePassword = type === 'password' && (
    <span onClick={() => setIsShow(!isShow)} className={style.showPassword}>
      {isShow ? <Show /> : <Hide />}
    </span>
  );

  const inputProps = {
    ref,
    type: isShow ? 'text' : type,
    className: `${style.inputText} ${error && style.inputError}`,
  };

  const renderElement = (element, props, otherProps) => {
    return createElement(element, {
      ...props,
      ...otherProps,
      rows: rows,
    });
  };

  return (
    <div className='form-control'>
      <div className='relative'>
        {renderElement(rows ? 'textarea' : 'input', inputProps, rest)}
        {renderTogglePassword}
      </div>
      {error && <p className='mt-1 text-[10px] text-danger capitalize-first'>{error}</p>}
    </div>
  );
});
