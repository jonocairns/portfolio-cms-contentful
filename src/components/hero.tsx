import * as React from 'react';

// import * as img from '../../static/bg_pencil.jpg';

interface Props {
    image?: string;
    title?: string;
    lead?: string;
}

export const Hero = (props: Props) => {
  const {image, title, lead} = props;

    const img = 'https://images.unsplash.com/photo-1461958508236-9a742665a0d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80';

  return (
    <div className="jumbotron jumbotron-fluid pb-0 mb-0" style={{
        backgroundImage: `url(${img})`,
        backgroundPosition: '50% 0%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '400px',
        backgroundAttachment: 'fixed'}}>
    <div className="container">
    <h1 className="display-4 text-white">{title}</h1>
    <p className="lead text-white" style={{maxWidth: '500px'}}>{lead}</p>
    </div>
    </div>
  );
};
