import {graphql, Link} from 'gatsby';
import React from 'react';

import {Layout} from '../components/layout';
import {ResponsiveSquare} from '../components/responsiveSquare';
import {SEO} from '../components/seo';

interface Props {
  data?: any;
}

const BlogPost = ({data}: Props) => {
  const {title, description, projects} = data.contentfulCollection;

  return (
    <Layout>
      <SEO title={title} />
      <div>
        <Link to="/">Back to Home</Link>

        <h1>collection: {title}</h1>
        <p>{description}</p>

        <div>
          {projects.map((p: any) => (
            <div>
              <div>
                <h3>project: {p.title}</h3>
                <p>{p.description}</p>
              </div>
              <div className="d-flex justify-content-center flex-wrap">
                {p.images.map((i: any) => (
                  <div className="m-4" style={{width: '20rem'}}>
                    <ResponsiveSquare
                      id={i.id}
                      paddingSizes={{small: '75%', medium: '75%', large: '75%'}}
                    >
                      <img
                        className="card-img-top h-100 w-100"
                        style={{
                          maxHeight: 300,
                          objectFit: 'cover',
                          objectPosition: 'center',
                          fontFamily:
                            "'object-fit: cover; object-position: center;'",
                        }}
                        src={i.file.url}
                        alt={i.title}
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
export default BlogPost;
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
