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
import classnames from 'classnames';

interface State {
  isOpen: boolean;
}

const navItems = [
  {path: '/', title: 'Work'},
  {path: '/about', title: 'About'},
  {path: '/contact', title: 'Contact'},
];

const getHex = () => {
  if(location) {
    switch(location.pathname){
      case '/contact': 
        return '#d6c8e5';
      case '/about':
      return '#bbd661';
      default: 
        return '#ffdfe3';
    }
  }
  return '#ffdfe3';
}

const isActive = (path: string) => {
  const currentPath = `/${location.pathname.split('/').join('')}`;
  return (location && currentPath === path) || (!navItems.some(ni => ni.path === currentPath) && path === '/');
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
                <div key={n.path}>
 
                
                  <AniLink paintDrip hex={getHex()}  to={n.path}  className={classnames('nav-link text-dark d-inline py-2', { 'nav-active': isActive(n.path)})}>

                    {n.title}
                  </AniLink>
                  {i !== navItems.length - 1 && <span className="d-none d-md-inline text-black">|</span>}
                </div>
              ))}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
