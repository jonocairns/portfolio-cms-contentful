import * as React from 'react';

interface Props {
    title?: string;
    lead?: string;
    className?: string;
}

export const Hero = (props: Props) => {
  const {title, lead, className} = props;

  const classes = `${className} jumbotron jumbotron-fluid py-5 my-0 jumbo-background `;

  return (
    <div className={classes} >
    <div className="container">
    <h1 className="display-4 pt-5">{title}</h1>
    <p className="lead pb-5" >{lead}</p>
    </div>
    </div>
  );
};
