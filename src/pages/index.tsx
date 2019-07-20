import {graphql, navigate, PageRendererProps, useStaticQuery} from 'gatsby';
import React from 'react';

import {Layout} from '../components/layout';
import {ResponsiveSquare} from '../components/responsiveSquare';
import {SEO} from '../components/seo';

type Props = PageRendererProps;

export const renderTitle = (title: string) => {
  const split = title.split(' ');
  const out: Array<JSX.Element> = [];
  split.forEach((w, i) => {
    out.push(
      <span
        key={`${w}-${i}`}
        className={i === 0 ? 'font-weight-bold' : undefined}
      >
        {w}{' '}
      </span>
    );
  });

  return out;
};

const Index = (props: Props) => {
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
              description
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

  const data = useStaticQuery(query);

  const siteTitle = data.site.siteMetadata.title;
  const collections = data.allContentfulCollection.edges!.map((edge: any) => ({
    id: edge.node.id,
    title: edge.node.title,
    description: edge.node.description,
    slug: edge.node.slug,
    image: edge.node.image && edge.node.image.file.url,
    projects:
      edge.node.projects &&
      edge.node.projects!.map((project: any) => ({
        title: project.title,
        description: project.description,
        images:
          project.images &&
          project.images!.map(
            (image: any) =>
              image && {
                title: image.title,
                abs: image.localFile.publicURL,
                src: image.file.url,
              }
          ),
      })),
  }));

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Ellie Earle" />
      <div className="d-flex justify-content-center flex-wrap py-4">
        {collections.map((c: any) => (
          <div
            key={c.id}
            onClick={e => {
              e.preventDefault();

              navigate(c.slug);
            }}
            className="card m-2 border-0 text-center hoverOpacity"
            style={{minWidth: '24rem', maxWidth: '24rem', cursor: 'pointer'}}
          >
            <ResponsiveSquare id={`rs-${c.id}`}>
              <img
                className="card-img-top h-100 w-100"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  backgroundSize: 'cover',
                  fontFamily: "'object-fit: cover; object-position: center;'",
                }}
                src={c.image}
                alt="Card image cap"
              />
            </ResponsiveSquare>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Index;
