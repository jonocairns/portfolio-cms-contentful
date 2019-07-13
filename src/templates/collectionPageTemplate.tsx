import classnames from 'classnames';
import {graphql} from 'gatsby';
import React from 'react';
import { Modal } from 'reactstrap';

import {Layout} from '../components/layout';
import {ResponsiveSquare} from '../components/responsiveSquare';
import {SEO} from '../components/seo';

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
      selectedImage: ''
    };
  }

  toggle = (img?: string) => this.setState({isOpen: !this.state.isOpen, selectedImage: img});

  render() {
    const {title, projects} = this.props.data.contentfulCollection;
    const {isOpen, selectedImage} = this.state;

    return (
      <Layout>
        <SEO title={title} />
        <div>
          <Modal isOpen={isOpen} toggle={this.toggle} size="lg">
            <img className="w-100 h-100" src={selectedImage} />
          </Modal>
          <div>
            {projects.map((p: any, i: number) => (
              <div
                key={p.id}
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
                    <div key={item.id} className="col-12 col-lg-6 pb-4">
                      <ResponsiveSquare
                        id={`${item.id}-rs`}
                        paddingSizes={{
                          small: '75%',
                          medium: '75%',
                          large: '75%',
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
                    </div>
                  ))}
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
