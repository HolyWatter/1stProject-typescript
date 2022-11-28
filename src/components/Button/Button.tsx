import React, { FC } from 'react';
import './Button.scss';

interface Props {
  children : string,
}

const Button:FC<Props> = ({ children }) => {
  return (
    <button className="btn">
      {children}
    </button>
  );
};

export default Button;
