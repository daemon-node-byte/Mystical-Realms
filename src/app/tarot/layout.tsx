import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Main = async ({ children }: LayoutProps) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default Main;