import 'bootstrap/scss/bootstrap.scss';
import {PageRendererProps} from 'gatsby';
import React, {ReactNode} from 'react';

interface Props extends PageRendererProps {
  title: string;
  children: ReactNode;
}

export const Layout = (props: Props) => {
  const {title, children} = props;

  return (
    <div className="container">
      <header>
        <h2>{title}</h2>
      </header>
      <main>{children}</main>
      <footer>© {new Date().getFullYear()} Ellie Earle</footer>
    </div>
  );
};
