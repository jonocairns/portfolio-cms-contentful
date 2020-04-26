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
        <footer className="py-4">
          <p className="small text-center">
            <i>
            The work displayed on this site (with the exception of Ellie Earle Graphic Designer & Aubri) was created by me while working under the employment of either Trade Depot Ltd, UP Education/ACG Education, South Sea Cruises or CBRE. All the finished artwork and any assets/photography/logos used in their creation belong fully to their respective company. All logos are copyrighted and were not conceived or created by me (except Aubri/Ellie Earle Graphic Design). My credits for any mockups used can be found in italics at the bottom of each section (if applicable).
            </i>
          </p>
          <p className="text-center">© {new Date().getFullYear()} Ellie Earle</p>
        </footer>
      </div>
    </React.Fragment>
  );
};
