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
      <div style={{backgroundColor: '#424244'}} className="fixed-top">
        <Navbar className="container py-4" dark expand="md">
          <NavbarBrand
            href="#"
            onClick={e => {
              e.preventDefault();

              navigate('/');
            }}
          >
            <h2 className="d-none d-md-block">
              {title}
              <img
                src={logo}
                className="ml-2 d-none d-md-inline"
                style={{maxWidth: '40px'}}
              />
            </h2>
            <h4 className="d-none d-sm-block d-md-none">{title}</h4>
            <h6 className="d-sm-none">{title}</h6>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {navItems.map((n, i: number) => (
                <React.Fragment>
                  <NavItem key={n.path}>
                  <Link to={n.path} className="nav-link text-white d-inline">
                    {n.title}
                  </Link>
                  {i !== navItems.length - 1 && <span className="d-inline text-white">|</span>}
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
