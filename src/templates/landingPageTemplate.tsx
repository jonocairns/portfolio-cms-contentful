import {graphql} from 'gatsby';
import marked from 'marked';
import React from 'react';

import {Layout} from '../components/layout';
import {SEO} from '../components/seo';
import { Hero } from '../components/hero';

interface Props {
  data?: any;
}

export const getMarkdown = (input: any) => {
  const rawMarkup = marked(input);

  return {__html: rawMarkup};
};

const LandingPage = ({data}: Props) => {
  const {content} = data.contentfulLandingPage;

  return (
    <Layout hideFooter={true}>
      <SEO title={''} />
      <div>
    

        {content.map((l1: any, i: number) => (
          <React.Fragment key={l1.id}>
            {l1.internal.type === 'ContentfulPageSection' && (
              <div key={l1.id} className="d-flex flex-column pb-4">
                <div>
                {i !== 0 && <h2 className="container display-4"  style={{fontSize: '30px'}}>{l1.title}</h2>}


                  {l1.content.map((l2: any) => (
                    <React.Fragment key={l2.id}>
                      {(l2.internal.type === 'ContentfulQuote' && (
                        <Hero title={l1.title} lead={l2.quoteSection.quoteSection} className="alt-jumbo" />
                      )) ||
                        (l2.internal.type === 'ContentfulContentSection' && (
                          <div className="py-2 container">
                            <div className=" pb-4">
                              <h4 className="text-primary font-weight-bold" style={{fontSize: '18px'}}>{l2.title}</h4>
                              <h6>{l2.subtitle}</h6>
                            </div>

                            <div
                              dangerouslySetInnerHTML={getMarkdown(
                                l2.content.content
                              )}
                            />
                          </div>
                        )) ||
                        (l2.internal.type === 'ContentfulSkillSection' && (
                          <div className="container">
                            <div className="">
                              <h5 className="text-primary"  style={{fontSize: '18px'}}>{l2.title}</h5>
                            </div>
                            <div className="row py-2">
                              {l2.skills.map((s: any) => (
                                <div
                                  key={s.id}
                                  className="row col-12 col-md-6 d-flex align-items-center py-2"
                                >
                                  <span className="col-6 text-right">
                                    {s.title}
                                  </span>

                                  <div className="col-6">
                                    <div
                                      className="progress bg-wellow"
                                      style={{height: '30px'}}
                                    >
                                      <div className="position-absolute text-center w-100 mt-1 pr-4">
                                        <span>
                                          {s.years} year{s.years !== 1 && 's'}
                                        </span>
                                      </div>

                                      <div
                                        style={{
                                          width: `${Math.abs(s.years / 5) *
                                            100}%`,
                                        }}
                                        className="progress-bar bg-gween"
                                        role="progressbar"
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )) ||
                        (l2.internal.type === 'ContentfulShortContentList' && (
                          <div className="mb-4 container">

                            <div className="">
                              <h6 className="text-primary"  style={{fontSize: '18px'}}>{l2.title}</h6>
                              <span>{l2.subtitle}</span>
                            </div>
                          </div>
                        )) ||
                        (l2.internal.type === 'ContentfulBulletPointList' && (
                          <div className="mb-4 d-flex justify-content-center flex-wrap container">
                            {l2.items &&
                              l2.items.map((item: any, index: number) => (
                                <div
                                  key={item.id}
                                  className="col-12 col-md-6 d-flex"
                                >
                                  <div className="text-primary px-4" style={{fontSize: '18px'}}> • </div>
                                  <div>{item.title}</div>
                                </div>
                              ))}
                          </div>
                        ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </Layout>
  );
};
export default LandingPage;
export const pageQuery = graphql`
  query($slug: String!) {
    contentfulLandingPage(slug: {eq: $slug}) {
      slug
      content {
        id
        title
        content {
          ... on ContentfulContentSection {
            title
            id
            subtitle
            content {
              content
              internal {
                type
              }
            }
            internal {
              type
            }
          }
          ... on ContentfulQuote {
            id
            quoteSection {
              quoteSection
            }
            internal {
              type
            }
          }
          ... on ContentfulSkillSection {
            id
            title
            skills {
              id
              title
              years
            }
            internal {
              type
            }
          }
          ... on ContentfulShortContentList {
            id
            title
            subtitle
            internal {
              type
            }
          }
          ... on ContentfulBulletPointList {
            id
            title
            internal {
              type
            }
            items {
              ... on ContentfulBulletPointItem {
                id
                title
              }
            }
          }
        }
        internal {
          type
        }
      }
    }
  }
`;
