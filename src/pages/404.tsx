import {graphql, PageRendererProps, useStaticQuery} from 'gatsby';
import React from 'react';
import {Layout} from '../components/layout';
import {SEO} from '../components/seo';

type Props = PageRendererProps;

export const NotFoundPage = (props: Props) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <Layout location={props.location} title={data.site.siteMetadata.title} hideFooter={true}>
      <SEO title="404: Not Found" />
<div className="container">
<h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
</div>
    </Layout>
  );
};

export default NotFoundPage;
