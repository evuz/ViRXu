import React, { FC } from 'react';

import { filterClassNames } from '../../Utils/filterClassNames';

type ButtonProps = {
  full?: boolean;
  disabled?: boolean;
  color?: 'primary' | 'accent' | 'confirm' | 'danger' | 'warning';
  type?: 'button' | 'submit';
  icon?: string | null;
  onClick?: Function;
};

export const Button: FC<ButtonProps> = ({
  children,
  full = false,
  disabled = false,
  color = 'primary',
  type = 'button',
  icon,
  onClick = () => {},
}) => {
  const colorClass = `Button--${color}`;
  const classnames = {
    Button: true,
    [colorClass]: true,
    'Button--icon': !children,
    'Button--full': full,
  };

  const click = (ev: any) => {
    if (disabled) {
      return;
    }
    onClick(ev);
  };

  return (
    <button className={filterClassNames(classnames)} type={type} disabled={disabled} onClick={click}>
      {icon ? (
        <i className="Button__icon">
          <span className="iconify" data-icon={icon}></span>
        </i>
      ) : null}
      {children}
    </button>
  );
};
