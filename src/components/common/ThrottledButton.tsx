import React, { ReactNode, useState } from 'react';
import { Button } from 'antd';

interface ThrottledButtonProps {
  interval: number;
  onClick: () => void;
  props?: object;
  children: ReactNode;
}

function ThrottledButton({
  interval,
  onClick,
  props = {},
  children,
}: ThrottledButtonProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <Button
      onClick={() => {
        setIsDisabled(true);
        onClick();
        setTimeout(() => setIsDisabled(false), interval);
      }}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </Button>
  );
}

export default ThrottledButton;
