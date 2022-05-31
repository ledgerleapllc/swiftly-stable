import classNames from 'classnames';
import { createContext, createElement, useContext, useState } from 'react';
import style from './style.module.scss';

const MenuContext = createContext({});

const Menu = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <MenuContext.Provider value={{ open, setOpen }}>
      <div className={style.menu}>{props.children}</div>
      {open && <div className={style.menuBackdrop} onClick={() => setOpen(!open)} />}
    </MenuContext.Provider>
  );
};

const MenuButton = (props) => {
  const { open, setOpen } = useContext(MenuContext);

  return (
    <button className={props.className} type='button' onClick={() => setOpen(!open)}>
      {props.children}
    </button>
  );
};

const MenuList = (props) => {
  const { open } = useContext(MenuContext);

  return (
    <ul className={classNames(style.menuList, !open ? style.menuHidden : '', props.className)}>{props.children}</ul>
  );
};

const MenuItem = (props) => {
  const { children, as = 'li', onClick, className, ...otherProps } = props;
  const { open, setOpen } = useContext(MenuContext);

  const handleChangeItem = (event) => {
    setOpen(!open);
    if (onClick && typeof onClick === 'function') {
      onClick(event);
    }
  };

  return createElement(
    as,
    {
      className: classNames(className, style.menuItem),
      onClick: handleChangeItem,
      ...otherProps,
    },
    <>{children}</>
  );
};

Menu.Button = MenuButton;
Menu.List = MenuList;
Menu.Item = MenuItem;

export { Menu, MenuButton, MenuList, MenuItem };
