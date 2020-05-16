import {graphql, PageRendererProps, useStaticQuery} from 'gatsby';
import React from 'react';

import {Layout} from '../components/layout';
import {ResponsiveSquare} from '../components/responsiveSquare';
import {SEO} from '../components/seo';
import { Hero } from '../components/hero';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import { getHex } from '../components/navbar';

type Props = PageRendererProps;

export const renderTitle = (title: string) => {
  const split = title.split(' ');
  const out: Array<JSX.Element> = [];
  split.forEach((w, i) => {
    out.push(
      <span
        key={`${w}-${i}`}
        style={{fontWeight: i === 0 ? 900 : undefined}}
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
        description: project.description.description,
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
    <Layout location={props.location} title={siteTitle} hideFooter={true}>
      <SEO title="Ellie Earle" />

      <Hero title="Ellie Earle" lead="Multidisciplinary designer. Food and caffeine driven. Will fight you for a donut."/>

      <div className="container d-flex justify-content-between flex-wrap py-4 mt-4">
        {collections.map((c: any) => (
          <AniLink key={c.id} paintDrip hex={getHex(props.location)} to={c.slug} 
          
            className="card mx-4 border-0 text-center hoverOpacity my-3 text-dark"
            style={{minWidth: '10rem', maxWidth: '10rem', cursor: 'pointer', textDecoration: 'none'}}
          >
            <ResponsiveSquare id={`rs-${c.id}`} className="overflow-hidden">
              <img
                className="card-img-top h-100 w-100 zoom"
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
            <div className="pt-2 display-4" style={{fontSize: '22px'}}>{c.title}</div>

            </AniLink>
        ))}
      </div>
    </Layout>
  );
};

export default Index;
