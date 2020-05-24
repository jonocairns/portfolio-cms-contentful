import React, { useState } from 'react';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import AniLink from "gatsby-plugin-transition-link/AniLink"
import logo from '../../static/logo-design.png';
import classnames from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';

const navItems = [
  {path: '/', title: 'Work'},
  {path: '/about', title: 'About'},
  {path: '/contact', title: 'Contact'},
];

export const getHex = (loc: any) => {
  if(loc) {
    switch(loc.pathname){
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

const Navigation = (props: { location: any, data: any}) => {
  const [isOpen, setIsOpen] = useState(false);
  const data = useStaticQuery(query);
  const collections = data.allContentfulCollection.edges!.map((edge: any) => ({
    id: edge.node.id,
    title: edge.node.title,
    slug: edge.node.slug,
  }));

  return  (
    <div style={{backgroundColor: 'white'}} className="fixed-top">
      <Navbar className="container py-4" light expand="md">
  <NavbarBrand><AniLink paintDrip hex={getHex(props.location)}   to={'/'}><img src={logo} style={{width:'30px'}}/></AniLink></NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto mt-2 mt-md-0" navbar>
            {navItems.map((n, i: number) => (
              <div key={n.path} className="py-2 d-flex flex-row align-items-center">

              
              {n.path === '/' ? <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav className={classnames('nav-link text-dark d-inline py-4 px-3')}>
                Work
              </DropdownToggle>
              <DropdownMenu left className="py-0 border-0">
                {collections.map((c: any) => <div className="py-3 pl-5 pl-md-3">
                  <AniLink paintDrip hex={getHex(props.location)}  to={c.slug} activeClassName="nav-active"  className={classnames('nav-link text-dark d-inline')}>
                  {c.title}
                  </AniLink>
                </div>)}
                
              </DropdownMenu>
            </UncontrolledDropdown> : 

                <AniLink paintDrip hex={getHex(props.location)}  to={n.path} activeClassName="nav-active" className={classnames('nav-link text-dark d-inline  py-2 px-3')}>

                  {n.title}
                </AniLink>}


                


                {i !== navItems.length - 1 && <span className="d-none d-md-inline text-black">|</span>}
              </div>
            ))}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );

}

export default Navigation;

const query = graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allContentfulCollection {
        edges {
          node {
            id
            title
            description
            slug
            image {
              file {
                url
              }
            }
            projects {
              title
              description {
                description
              }
              images {
                title
                file {
                  url
                }
                localFile {
                  publicURL
                }
              }
            }
          }
        }
      }
    }
  `;