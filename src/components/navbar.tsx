import {Link} from 'gatsby';
import React from 'react';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from 'reactstrap';

import logo from '../../static/logo.png';
import title from '../../static/title.png';

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
    return (
      <div style={{backgroundColor: '#424244'}}>
        <Navbar className="container py-4" dark expand="md">
          <NavbarBrand href="/">
            <img src={logo} className="mr-4 d-none d-md-inline" />
            <img style={{maxWidth: '400px'}} src={title} />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto mt-3" navbar>
              {navItems.map(n => (
                <NavItem>
                  <Link
                    to={n.path}
                    activeStyle={{fontWeight: '700'}}
                    partiallyActive={true}
                    className="nav-link"
                  >
                    {n.title}
                  </Link>
                </NavItem>
              ))}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
