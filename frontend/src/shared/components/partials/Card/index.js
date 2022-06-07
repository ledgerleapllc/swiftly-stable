import classNames from 'classnames';
import styles from './style.module.scss';

const Card = (props) => {
  return <div className={classNames(props.className, styles.card)}>{props.children}</div>;
};

Card.Header = ({ icon, title, children, className }) => {
  return (
    <div className={`border-b px-6 py-4 flex justify-between ${className}`}>
      <div className='flex gap-x-2 items-center'>
        <span>{icon}</span>
        <div className='text-primary font-medium text-sm'>{title}</div>
      </div>
      {children}
    </div>
  );
};

Card.Body = ({ children, noSpacing = false, className }) => {
  return (
    <div
      className={classNames(
        'flex flex-col flex-1 min-h-0 ',
        {
          'px-6 py-4': !noSpacing,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

Card.Footer = ({ children, noSpacing = false, className }) => {
  return (
    <div
      className={classNames(
        'flex flex-col flex-1 min-h-0 ',
        {
          'px-6 py-4': !noSpacing,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

const CardHeader = Card.Header;
const CardBody = Card.Body;
const CardFooter = Card.Footer;

export { Card, CardHeader, CardBody, CardFooter };
