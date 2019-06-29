import {graphql, PageRendererProps, useStaticQuery} from 'gatsby';
import React from 'react';

import {Layout} from '../components/layout';
import {SEO} from '../components/seo';

type Props = PageRendererProps;

const BlogIndex = (props: Props) => {
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
            title
            description
            projects {
              title
              description
              images {
                title
                file {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = useStaticQuery(query);

  const siteTitle = data.site.siteMetadata.title;
  const collections = data.allContentfulCollection.edges!.map((edge: any) => ({
    title: edge.node.title,
    description: edge.node.description,
    projects: edge.node.projects!.map((project: any) => ({
      title: project.title,
      description: project.description,
      images: project.images!.map((image: any) => ({
        title: image.title,
        src: image.file.url,
      })),
    })),
  }));

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title="All posts"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      <div className="card-deck">
        {collections.map((c: any) => (
          <div className="card" style={{width: '24rem'}}>
            <img
              className="card-img-top"
              style={{maxHeight: 300}}
              src={c.projects[0].images[0].src}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">{c.title}</h5>
              <p className="card-text">{c.description}</p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default BlogIndex;
