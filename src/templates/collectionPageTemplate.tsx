import classnames from 'classnames';
import {graphql} from 'gatsby';
import React from 'react';

import {Layout} from '../components/layout';
import {ResponsiveSquare} from '../components/responsiveSquare';
import {SEO} from '../components/seo';
import {renderTitle} from '../pages/index';

interface Props {
  data?: any;
}

const CollectionPage = ({data}: Props) => {
  const {title, projects} = data.contentfulCollection;

  return (
    <Layout>
      <SEO title={title} />
      <div>
        <h1 className="text-center py-4 mt-4">{renderTitle(title)}</h1>

        <div>
          {projects.map((p: any, i: number) => (
            <div
              className={
                // tslint:disable-next-line: no-bitwise
                i & 1
                  ? 'row py-4 d-flex flex-row'
                  : 'row py-4 d-flex flex-row-reverse'
              }
            >
              <div
                className={classnames(
                  'col-12 col-lg-6 d-flex align-items-center',
                  // tslint:disable-next-line: no-bitwise
                  i & 1 ? 'justify-content-lg-end' : 'justify-content-start'
                )}
              >
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
              </div>
              <div className="col-12 col-lg-6 d-flex flex-wrap justify-content-center justify-content-lg-start">
                {p.images.map((item: any) => (
                  <div className="col-12 col-lg-6 pb-4">
                    <ResponsiveSquare
                      id={item.id}
                      paddingSizes={{
                        small: '75%',
                        medium: '75%',
                        large: '75%',
                      }}
                    >
                      <img
                        className="card-img-top h-100 w-100"
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                          fontFamily:
                            '\'object-fit: cover; object-position: center;\'',
                        }}
                        src={item.file.url}
                        alt={item.title}
                      />
                    </ResponsiveSquare>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default CollectionPage;
export const pageQuery = graphql`
  query($slug: String!) {
    contentfulCollection(slug: {eq: $slug}) {
      title
      description
      projects {
        id
        title
        description
        images {
          id
          file {
            url
          }
          title
        }
      }
    }
  }
`;
