import {graphql} from 'gatsby';
import marked from 'marked';
import React from 'react';

import {Layout} from '../components/layout';
import {SEO} from '../components/seo';

interface Props {
  data?: any;
}

const getMarkdown = (input: any) => {
  const rawMarkup = marked(input, {sanitize: true});

  return {__html: rawMarkup};
};

const LandingPage = ({data}: Props) => {
  const {content} = data.contentfulLandingPage;

  return (
    <Layout>
      <SEO title={''} />
      <div className="pt-4">
        {content.map(
          (l1: any) =>
            l1.internal.type === 'ContentfulPageSection' && (
              <div key={l1.id} className="d-flex flex-column pb-4">
                {l1.title && (
                  <h2 className="text-center pb-4 font-weight-bold">
                    {l1.title}
                  </h2>
                )}

                <div>
                  {l1.content.map(
                    (l2: any) =>
                      (l2.internal.type === 'ContentfulQuote' && (
                        <div className="px-md-5 mx-md-5 text-center">
                          <b>
                            <i>{l2.quoteSection.quoteSection}</i>
                          </b>
                        </div>
                      )) ||
                      (l2.internal.type === 'ContentfulContentSection' && (
                        <div className="py-2">
                          <div className="text-center pb-4">
                            <h4 className="text-primary">{l2.title}</h4>
                            <h6>{l2.subtitle}</h6>
                          </div>

                          <div
                            className="nth-child-li-target"
                            dangerouslySetInnerHTML={getMarkdown(l2.content.content)}
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
                              <div className="row col-12 col-md-6 d-flex align-items-center">
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
                      ))
                  )}
                </div>
              </div>
            )
        )}
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
        title
        content {
          ... on ContentfulContentSection {
            title
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
        }
        internal {
          type
        }
      }
    }
  }
`;
