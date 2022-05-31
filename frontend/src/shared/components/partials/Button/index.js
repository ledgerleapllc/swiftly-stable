// import { Loading } from '@shared/components/Loading';
import classNames from 'classnames';
import { createElement, useEffect, useRef, useState } from 'react';
import './style.module.scss';

export const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'md',
  className,
  isLoading,
  as = 'button',
  rounded = false,
  onClick,
  delay = false,
  disabled,
  ...otherProps
}) => {
  const btnDelayRef = useRef(null);
  const rippleDelayRef = useRef(null);
  const rippleRef = useRef(null);

  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(disabled);
  }, [disabled]);

  useEffect(() => {
    return () => {
      clearTimeout(btnDelayRef.current);
      clearTimeout(rippleDelayRef.current);
    };
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
    if (rippleRef?.current) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-element');
      rippleRef.current.innerHTML = '';
      rippleRef.current.appendChild(ripple);

      const diameter = Math.max(e.currentTarget.clientWidth, e.currentTarget.clientHeight);
      ripple.style.width = ripple.style.height = `${diameter}px`;
      const rect = e.currentTarget.getBoundingClientRect();
      const left = e.clientX - rect.left - diameter / 2;
      const top = e.clientY - rect.top - diameter / 2;
      ripple.style.left = `${left}px`;
      ripple.style.top = `${top}px`;
      rippleDelayRef.current = setTimeout(() => {
        ripple.remove();
      }, 300);
    }
    if (onClick) {
      onClick(e);
      if (delay) {
        setDisabled(true);
        btnDelayRef.current = setTimeout(() => {
          setDisabled(false);
        }, 1500);
      }
    }
  };

  const renderChildren = (
    <>
      <span className='ripple-box' ref={rippleRef} />
      <div className='relative flex justify-center items-center text-center w-full h-full'>
        {isLoading ? <div className='loading'>{/* <Loading className='w-6 h-6 text-gray2' /> */}</div> : children}
      </div>
    </>
  );

  return createElement(
    as,
    {
      className: classNames(
        'btn',
        {
          [`btn-${color}`]: variant,
          [`btn-${color}-${variant}`]: variant,
          [`btn-${size}`]: size,
          'cursor-not-allowed': isLoading,
          'rounded-full': rounded,
        },
        className
      ),
      onClick: handleClick,
      disabled: isDisabled,
      ...otherProps,
    },
    renderChildren
  );
};
