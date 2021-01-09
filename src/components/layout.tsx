import React from 'react';

import '../custom.scss';

import Navigation from './navbar';

export const Layout = (props: any) => {
  const {children, hideFooter} = props;

  return (
    <React.Fragment>
      <Navigation {...props} />
      <div style={{marginTop: '70px'}}   data-sal="slide-up"
  data-sal-delay="300"
  data-sal-easing="ease">
        <main>{children}</main>
        {!hideFooter && <footer className="pt-4 container mt-5 ">
          <p className="small text-center" style={{fontSize: '10px'}}>
            <i>
            The work displayed on this site (with the exception of Ellie Earle Graphic Designer & Aubri) was created by me while working under the respective employment of these companies, and is displayed with their permission. Logos for Be Intent, Trade Depot, UP Education, ACG Education, South Sea Cruises/Malamala Beach Club and CBRE are copyrighted and belong to their respective companies.
            </i>
          </p>
          <p className="text-center" style={{fontSize: '10px'}}>© {new Date().getFullYear()} Ellie Earle</p>
        </footer>}
      </div>
    </React.Fragment>
  );
};
