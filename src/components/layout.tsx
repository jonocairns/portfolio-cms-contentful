import React from 'react';

import '../custom.scss';

import Navigation from './navbar';

export const Layout = (props: any) => {
  const {children} = props;

  return (
    <React.Fragment>
      <Navigation />
      <div style={{marginTop: '100px'}} className="container">
        <main>{children}</main>
        <hr />
        <footer className="d-flex justify-content-center py-4">
          © {new Date().getFullYear()} Ellie Earle
        </footer>
      </div>
    </React.Fragment>
  );
};
