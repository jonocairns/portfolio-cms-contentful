import classnames from 'classnames';
import {graphql} from 'gatsby';
import React from 'react';
import {Modal} from 'reactstrap';

import {Layout} from '../components/layout';
import {ResponsiveSquare} from '../components/responsiveSquare';
import {SEO} from '../components/seo';
import {renderTitle} from '../pages/index';

interface Props {
  data?: any;
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
    const {title, description, projects} = this.props.data.contentfulCollection;
    const {isOpen, selectedImage} = this.state;

    return (
      <Layout>
        <SEO title={title} />
        <div>
          <Modal isOpen={isOpen} toggle={this.toggle} size="lg">
            <img className="w-100 h-100" src={selectedImage} />
          </Modal>
          <div className="pt-4">
            <div className="text-center py-4">
              <h2>{renderTitle(title)}</h2>
            </div>

            {projects &&
              projects.map((p: any, i: number) => (
                <div
                  key={p.id}
                  className={
                    // tslint:disable-next-line: no-bitwise
                    i & 1
                      ? 'row d-flex flex-row'
                      : 'row d-flex flex-row-reverse'
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
                      <h3 className="font-weight-bold">{p.title}</h3>
                      <p>{p.description.description}</p>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 d-flex flex-wrap justify-content-center justify-content-lg-start px-0">
                    {p.images.map((item: any) => {
                      const isAnimation = item.file.url.endsWith('.gif');

                      return (
                        <div
                          key={item.id}
                          className={classnames('col-12 px-0', {
                            'col-md-6': isAnimation,
                          })}
                        >
                          {isAnimation && (
                            <img
                              className="card-img-top w-100 h-100"
                              src={item.file.url}
                              alt={item.title}
                              onClick={e => this.toggle(item.file.url)}
                            />
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
                              <img
                                onClick={e => this.toggle(item.file.url)}
                                className="card-img-top h-100 w-100"
                                style={{
                                  objectFit: 'cover',
                                  objectPosition: 'center',
                                  fontFamily:
                                    "'object-fit: cover; object-position: center;'",
                                }}
                                src={item.file.url}
                                alt={item.title}
                              />
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
          file {
            url
          }
          title
        }
      }
    }
  }
`;
