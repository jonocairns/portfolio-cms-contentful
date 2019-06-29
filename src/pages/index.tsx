import {graphql, Link, PageRendererProps, useStaticQuery} from 'gatsby';
import {first, shuffle} from 'lodash';
import React from 'react';

import {Layout} from '../components/layout';
import {ResponsiveSquare} from '../components/responsiveSquare';
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
            id
            title
            description
            slug
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
    id: edge.node.id,
    title: edge.node.title,
    description: edge.node.description,
    slug: edge.node.slug,
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
      <div className="d-flex justify-content-center flex-wrap py-4">
        {collections.map((c: any) => (
          <div className="card m-4" style={{minWidth: '24rem', maxWidth: '24rem'}}>
            <ResponsiveSquare
              id={c.id}
              paddingSizes={{small: '75%', medium: '75%', large: '75%'}}
            >
              <img
                className="card-img-top h-100 w-100"
                style={{
                  maxHeight: 300,
                  objectFit: 'cover',
                  objectPosition: 'center',
                  fontFamily: '\'object-fit: cover; object-position: center;\'',
                }}
                src={first(shuffle(c.projects[0].images))!.src}
                alt="Card image cap"
              />
            </ResponsiveSquare>

            <div className="card-body">
              <h5 className="card-title">{c.title}</h5>
              <p className="card-text">{c.description}</p>
              <Link to={c.slug} className="btn btn-secondary">See more</Link>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default BlogIndex;
