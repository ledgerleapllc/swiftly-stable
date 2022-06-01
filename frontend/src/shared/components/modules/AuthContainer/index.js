import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Card } from 'shared/components/partials';

export const AuthContainer = ({
  className,
  showInstruction,
  children,
  maxWidth = 'max-w-xl',
  maxHeight = 'max-h-[90vh]',
}) => {
  return (
    <div className={classNames('h-full w-full flex flex-col items-center justify-center', className)}>
      <Card className={classNames('w-5/6 px-12 pb-12 pt-6', maxWidth, maxHeight)}>
        <Logo className='w-1/3 mx-auto' />
        <div className='pt-6 min-h-0 flex-1'>{children}</div>
      </Card>
      {showInstruction && (
        <ul className='flex space-x-6 pt-5'>
          <li>
            <Link className='text-primary' to='/privacy-policy'>
              Privacy Policy
            </Link>
          </li>
          <li>|</li>
          <li>
            <Link className='text-primary' to='/terms-conditions'>
              Terms & Conditions
            </Link>
          </li>
          <li>|</li>
          <li>
            <Link className='text-primary' to='/help'>
              Help
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};
