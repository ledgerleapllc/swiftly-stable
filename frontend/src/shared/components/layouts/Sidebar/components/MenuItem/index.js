import classNames from 'classnames';
import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

function MenuItem(props) {
  const {
    item: { component, text, href },
  } = props;

  const location = useLocation();
  const history = useHistory();

  const isActive = (path, href) => {
    return path.startsWith(href);
  };

  return (
    <Link
      to={href || '#'}
      className={classNames('menu-item relative', {
        'active': isActive(location.pathname, href),
      })}
      onClick={() => {
        location.pathname === href && history.go(0);
      }}
    >
      {component && <div className='menu-icon'>{component}</div>}
      {text && <span className='menu-text hidden sm:block whitespace-nowrap'>{text}</span>}
    </Link>
  );
}

export default MenuItem;
