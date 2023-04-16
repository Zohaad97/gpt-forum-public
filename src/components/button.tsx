import React from 'react';

type ButtonType = {
  type: string;
};
export const Button: React.FC<ButtonType> = props => {
  return <button type="button">Hello Button</button>;
};
