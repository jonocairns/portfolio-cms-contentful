import classnames from 'classnames';
import {graphql} from 'gatsby';
import React from 'react';
import {Modal} from 'reactstrap';

import {Layout} from '../components/layout';
import {ResponsiveSquare} from '../components/responsiveSquare';
import {SEO} from '../components/seo';
import {getMarkdown} from './landingPageTemplate';
import { Hero } from '../components/hero';
import Img from 'gatsby-image';

interface Props {
  data?: any;
  location: any;
}

interface State {
  isOpen: boolean;
  selectedImage: string | undefined;
}

export default class CollectionPage extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false,
      selectedImage: '',
    };
  }

  toggle = (img?: string) =>
    this.setState({isOpen: !this.state.isOpen, selectedImage: img});

  render() {
    const {title, projects, description} = this.props.data.contentfulCollection;
    const {isOpen, selectedImage} = this.state;

    return (
      <Layout location={this.props.location}>
        <SEO title={title} />
        <div>
          <Modal isOpen={isOpen} toggle={this.toggle as any} size="lg">
            <img className="w-100 h-100 p-4" src={selectedImage} />
          </Modal>

        <Hero title={title}lead={description}  />

          <div className="pt-4 container">

            {projects &&
              projects.map((p: any, i: number) => (
                <div
                  key={p.id}
                  className={'row d-flex flex-row-reverse pb-4 mb-4'
                  }
                >
                  <div
                    className={classnames(
                      'col-12 col-lg-6 d-flex align-items-center',
                      // tslint:disable-next-line: no-bitwise
                      i & 1 ? 'justify-content-lg-end' : 'justify-content-start'
                    )}
                  >
                    <div className="p-4">
                      <h5 className="display-4" style={{fontSize: '30px'}}>{p.title}</h5>
                      <div
                        dangerouslySetInnerHTML={getMarkdown(
                          p.description.description
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 d-flex flex-wrap justify-content-center justify-content-lg-start px-0 align-items-center">
                    {p.images?.map((item: any) => {
                      const isAnimation = item.file.url.endsWith('.gif');
                      const isMovie = item.file.url.endsWith('.mp4');

                      if(isMovie) {

                        return (
                          <div key={item.id} className="col-12 px-0">
                          <video width="100%" controls>
                            <source src={item.file.url} type="video/mp4" />
                            Your browser does not support video.
                          </video>
                          </div>
                        )
                      }

                      return (
                        <div
                          key={item.id}
                          className={classnames('p-2 col-12 ', p.images.length > 1 && 'col-md-6')}
                        >
                          {isAnimation && (
                            <div onClick={e => this.toggle(item.file.url)}>
                            <Img
                              className="card-img-top w-100"
                              fluid={item.fluid}
                              alt={item.title}
                            />
                            </div>
                          )}

                          {!isAnimation && (
                            <ResponsiveSquare
                              id={`${item.id}-rs`}
                              paddingSizes={{
                                small: '100%',
                                medium: '100%',
                                large: '100%',
                              }}
                            >
                             <div onClick={e => this.toggle(item.file.url)}>
                              <Img
                                  className="card-img-top h-100 w-100"
                                  style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    fontFamily:
                                      "'object-fit: cover; object-position: center;'",
                                  }}
                                  fluid={item.fluid}
                                  alt={item.title}
                                />
                              </div>
                            </ResponsiveSquare>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query($slug: String!) {
    contentfulCollection(slug: {eq: $slug}) {
      title
      description
      projects {
        id
        title
        description {
          description
        }
        images {
          id
          fluid(maxWidth: 1800) {
            ...GatsbyContentfulFluid_withWebp_noBase64
          }
          file {
            url
          }
          title
        }
      }
    }
  }
`;
