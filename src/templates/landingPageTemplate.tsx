import {graphql} from 'gatsby';
import marked from 'marked';
import React from 'react';

import {Layout} from '../components/layout';
import {SEO} from '../components/seo';
import {renderTitle} from '../pages/index';
import quoteStart from '../../static/quotation_marks-start.svg';
import quoteEnd from '../../static/quotation_marks-end.svg';

interface Props {
  data?: any;
}

const getMarkdown = (input: any) => {
  const rawMarkup = marked(input);

  return {__html: rawMarkup};
};

const LandingPage = ({data}: Props) => {
  const {content} = data.contentfulLandingPage;

  return (
    <Layout>
      <SEO title={''} />
      <div className="pt-4">
        {content.map((l1: any) => (
          <React.Fragment key={l1.id}>
            {l1.internal.type === 'ContentfulPageSection' && (
              <div key={l1.id} className="d-flex flex-column pb-4">
                {l1.title && (
                  <h2 className="text-center py-4">{renderTitle(l1.title)}</h2>
                )}

                <div>
                  {l1.content.map((l2: any) => (
                    <React.Fragment key={l2.id}>
                      {(l2.internal.type === 'ContentfulQuote' && (
                        <div className="px-md-5 mx-md-5 text-center d-flex">
                          <img
                            style={{width: '35px'}}
                            className="mx-4 d-block align-self-start"
                            src={quoteStart}
                          />
                          <b>
                            <i>{l2.quoteSection.quoteSection}</i>
                          </b>
                          <img
                            style={{width: '35px'}}
                            className="mx-4 d-block align-self-end"
                            src={quoteEnd}
                          />
                        </div>
                      )) ||
                        (l2.internal.type === 'ContentfulContentSection' && (
                          <div className="py-2">
                            <div className="text-center pb-4">
                              <h4 className="text-primary">{l2.title}</h4>
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
                          <div>
                            <div className="text-center">
                              <h5 className="text-primary">{l2.title}</h5>
                            </div>
                            <div className="row py-2">
                              {l2.skills.map((s: any) => (
                                <div
                                  key={s.id}
                                  className="row col-12 col-md-6 d-flex align-items-center"
                                >
                                  <span className="col-6 text-right">
                                    {s.title}
                                  </span>

                                  <div className="col-6">
                                    <div
                                      className="progress bg-dark"
                                      style={{height: '30px'}}
                                    >
                                      <div
                                        style={{
                                          width: `${Math.abs(s.years / 5) *
                                            100}%`,
                                        }}
                                        className="progress-bar"
                                        role="progressbar"
                                      >
                                        [ {s.years} years ]
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )) ||
                        (l2.internal.type === 'ContentfulShortContentList' && (
                          <div className="mb-4">
                            <div className="text-center">
                              <h6 className="text-primary">{l2.title}</h6>
                              <span>{l2.subtitle}</span>
                            </div>
                          </div>
                        )) ||
                        (l2.internal.type === 'ContentfulBulletPointList' && (
                          <div className="mb-4">
                            <div className="text-center">
                              {l2.items &&
                                l2.items.map((item: any, index: number) => (
                                  <span key={item.id}>
                                    {item.title}
                                    <span className="text-primary">
                                      {index === l2.items.length - 1
                                        ? ' '
                                        : ' • '}
                                    </span>
                                  </span>
                                ))}
                            </div>
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
