// import { ReactComponent as IconX } from 'assets/icons/ic-x.svg';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import classNames from 'classnames';
import React, { cloneElement, useState } from 'react';
import styles from './style.module.scss';
const ZINDEX_DEFAULT = 1000;

// Common dialog Context
const DialogContext = React.createContext({});

// Create `useDialog` hook that using DialogContext
const useDialog = () => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};

const DialogProvider = (props) => {
  const [dialogs, setDialogs] = useState([]);

  const appendDialog = (dialog) => {
    setDialogs([...dialogs, dialog]);
  };

  const openDialog = (dialog) => {
    setDialogs([dialog]);
  };

  const closeAllDialogs = () => {
    setDialogs([]);
  };

  const closeCurrentDialog = (index) => {
    dialogs.splice(index, 1);
    setDialogs([...dialogs]);
  };

  const renderDialogView = (dialog, index) => {
    return cloneElement(dialog, {
      close: (data) => {
        if (dialog.props.afterClosed && typeof dialog.props.afterClosed === 'function') {
          dialog.props?.afterClosed(data);
        }

        closeCurrentDialog(index);
      },
    });
  };

  return (
    <DialogContext.Provider value={{ appendDialog, closeAllDialogs, closeCurrentDialog, openDialog }}>
      {dialogs?.length > 0 && (
        <>
          {dialogs.map((dialog, index) => (
            <div key={`dialog-${index}`}>
              <div className={styles.dialogBackdrop} style={{ zIndex: ZINDEX_DEFAULT + index + index }} />
              <div
                className={classNames(styles.dialogWrapper, styles.flexCenter)}
                style={{ zIndex: ZINDEX_DEFAULT + index + index + 1 }}
                onClick={() => closeCurrentDialog(index)}
              >
                {renderDialogView(dialog, index)}
              </div>
            </div>
          ))}
        </>
      )}
      {props.children}
    </DialogContext.Provider>
  );
};

const Dialog = ({ showCloseBtn = true, className, closeRight = false, close, children }) => {
  return (
    <div className={classNames(styles.dialogContainer, className)} onClick={(e) => e.stopPropagation()}>
      {showCloseBtn && (
        <button
          className={classNames('absolute z-10 text-white text-2xl', {
            'top-5 left-5': !closeRight,
            'top-5 right-5': closeRight,
          })}
          onClick={close}
        >
          x
        </button>
      )}
      <Logo className='w-1/4 mx-auto' />
      {children}
    </div>
  );
};

const renderSteps = (step, currentStep) => {
  return (
    <>
      <div className='flex gap-2 mr-1'>
        {[...Array(step).keys()].map((i) => (
          <div
            className={classNames(
              `transition ease-in-out border-solid w-2 h-2 rounded cursor-pointer ${
                currentStep === i + 1 ? 'bg-primary' : 'bg-gray2'
              }`
            )}
          ></div>
        ))}
      </div>
    </>
  );
};

Dialog.Header = ({ className, children, title, subTitle, step, currentStep }) => {
  return (
    <div
      className={classNames(
        styles.dialogHeader,
        {
          'flex justify-between': step,
        },
        className
      )}
    >
      <div>
        {title && <p className='text-base font-semibold text-black1'>{title}</p>}
        {subTitle && <p className='text-xs font-normal mt-1'>{subTitle}</p>}
      </div>
      {step && renderSteps(step, currentStep)}
      {children}
    </div>
  );
};

Dialog.Body = (props) => <div className={classNames(styles.dialogBody, props.className)}>{props.children}</div>;

Dialog.Footer = ({ step, currentStep, children, className }) => (
  <div className={classNames(styles.dialogFooter, className)}>
    {children}
    {step && (
      <div className='flex items-center justify-center pt-4'>
        <div className='flex gap-1'>{renderSteps(step, currentStep)}</div>
      </div>
    )}
  </div>
);

export { DialogProvider, Dialog, useDialog };
