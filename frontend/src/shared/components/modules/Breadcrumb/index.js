import classNames from 'classnames';
import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './style.module.scss';

const Breadcrumb = (props) => {
  const location = useLocation();

  return (
    <div className={classNames(styles.breadcrumb, props.className)}>
      {props.data?.map((child, index) => {
        return (
          <Fragment key={index}>
            <Link
              className={classNames(index === props.data?.length - 1 && 'text-primary')}
              to={child.href || location.pathname}
            >
              {child.label}
            </Link>
            {index === props.data?.length - 1 ? '' : <span>/</span>}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
