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
        <footer className="d-flex justify-content-center py-4">
          <div>© {new Date().getFullYear()} Ellie Earle</div>
          <p className="small">
            <i>
          The work on this site was done by me while working at the named companies 
            (ACG Education/UP Education, South Sea Cruises, and CBRE). All the finished 
            work, as per outlined in my contract(s), belongs to its respective company. 
            All logos are copyrighted. I do not claim to have made the logos or secondary
            assets of any brand of ACG Education, South Sea Cruises or CBRE, and I claim no 
            ownership of the finished product or the assets/photographs used in the submitted 
            artwork. All brands mentioned or shown here are wholly owned and operated by their 
            respective umbrella corporations (ACG Education/UP Education, South Sea Cruises or CBRE).
            </i>
          </p>
          
        </footer>
      </div>
    </React.Fragment>
  );
};
