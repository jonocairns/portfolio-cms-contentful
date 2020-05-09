import classnames from 'classnames';
import {Link, navigate} from 'gatsby';
import {every} from 'lodash';
import React from 'react';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from 'reactstrap';

import AniLink from "gatsby-plugin-transition-link/AniLink"
import logo from '../../static/brand_logo_trans.png';
// import title from '../../static/title.png';

interface State {
  isOpen: boolean;
}

const navItems = [
  {path: '/', title: 'Work'},
  {path: '/about', title: 'About'},
  {path: '/contact', title: 'Contact'},
];

export default class Navigation extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  render() {
    const title = (
      <React.Fragment>
        <span className="font-weight-bold">Ellie Earle </span>
        <span className="font-weight-light">| Graphic Design</span>
      </React.Fragment>
    );

    return (
      <div style={{backgroundColor: 'white'}} className="fixed-top">
        <Navbar className="container py-4" light expand="md">
          
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {navItems.map((n, i: number) => (
                <React.Fragment key={n.path}>
                  <NavItem className="py-2">
                
                  <AniLink paintDrip hex="#fff"   to={n.path} className="nav-link text-dark d-inline">

                    {n.title}
                  </AniLink>
                  {i !== navItems.length - 1 && <span className="d-none d-md-inline text-black">|</span>}
                </NavItem>
                </React.Fragment>
              ))}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
