import React from 'react';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  NavbarBrand,
} from 'reactstrap';

import AniLink from "gatsby-plugin-transition-link/AniLink"
import logo from '../../static/logo-design.png';

interface State {
  isOpen: boolean;
}

const navItems = [
  {path: '/', title: 'Work'},
  {path: '/about', title: 'About'},
  {path: '/contact', title: 'Contact'},
];

const getHex = () => {
  switch(location.pathname){
    case '/contact': 
      return '#d6c8e5';
    case '/about':
    return '#bbd661';
    default: 
      return '#ffdfe3';
  }
}

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
      <div style={{backgroundColor: 'white'}} className="fixed-top">
        <Navbar className="container py-4" light expand="md">
    <NavbarBrand><AniLink paintDrip hex="#fff"   to={'/'}><img src={logo} style={{width:'30px'}}/></AniLink></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {navItems.map((n, i: number) => (
                <React.Fragment key={n.path}>
 
                  <NavItem className="py-2" >
                
                  <AniLink paintDrip hex={getHex()}  to={n.path} activeClassName="nav-active" partiallyActive={location.pathname !== '/about' && location.pathname !== '/contact'}  className="nav-link text-dark d-inline">

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
