import 'bootstrap/scss/bootstrap.scss';
import React from 'react';

import Navigation from './navbar';

export const Layout = (props: any) => {
  const {children} = props;

  return (
    <div className="container">
      <Navigation />
      <main>{children}</main>
      <footer className="d-flex justify-content-center py-4">
        © {new Date().getFullYear()} Ellie Earle
        </footer>
    </div>
  );
};
