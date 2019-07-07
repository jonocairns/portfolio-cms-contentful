import path from 'path';
import slash from 'slash';

import {GatsbyCreatePages} from '../types';

export const createPages: GatsbyCreatePages = async ({
  graphql,
  boundActionCreators,
}) => {
  const {createPage} = boundActionCreators;

  try {
    const result = await graphql(
        `
        query {
            site {
              siteMetadata {
                title
              }
            }
            allContentfulCollection {
              edges {
                node {
                  slug
                }
              }
            }
            allContentfulLandingPage {
              edges {
                node {
                  slug
                }
              }
            }
          }
        `);

        const collectionPageTemplate = path.resolve('./src/templates/collectionPageTemplate.tsx');

        const landingPageTemplate = path.resolve('./src/templates/landingPageTemplate.tsx');

        result.data.allContentfulLandingPage.edges.forEach((edge: any) => {
          console.log(`creating page for ${edge.node.slug}`);
          createPage({
            path: `${edge.node.slug}`,
              component: slash(landingPageTemplate),
              context: {
                slug: edge.node.slug,
                id: edge.node.id
              }
        });
        })

        return result.data.allContentfulCollection.edges.forEach((edge: any) => {
            console.log(`creating page for ${edge.node.slug}`);

            createPage({
                path: `${edge.node.slug}`,
                  component: slash(collectionPageTemplate),
                  context: {
                    slug: edge.node.slug,
                    id: edge.node.id
                  }
            });
        });
  } catch (er) {
    console.log('Error retrieving contentful data', er);
  }
};
