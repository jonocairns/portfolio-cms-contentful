import {graphql} from 'gatsby';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import {Layout} from '../components/layout';
import {SEO} from '../components/seo';

interface Props {
  data?: any;
}

const LandingPage = ({data}: Props) => {
  const {slug, content} = data.contentfulLandingPage;

  return (
    <Layout>
      <SEO title={''} />
      <div>
        <h1 className="text-center py-4">{slug}</h1>

        {content.map(
          (l1: any) =>
            l1.internal.type === 'ContentfulPageSection' && (
              <div className="d-flex flex-column pb-4">
                {l1.title && (
                  <h2 className="text-center pb-4 font-weight-bold">
                    {l1.title}
                  </h2>
                )}

                <div>
                  {l1.content.map(
                    (l2: any) =>
                      (l2.internal.type === 'ContentfulQuote' && (
                        <div><b><i>{l2.quoteSection.quoteSection}</i></b></div>
                      )) ||
                      (l2.internal.type === 'ContentfulContentSection' && (
                        <div>
                          <div className="text-center pb-4">
                            <h4 className="text-primary">{l2.title}</h4>
                            <h6>{l2.subtitle}</h6>
                          </div>
                          <ReactMarkdown className="nth-child-li-target" source={l2.content.content} />
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
                                <span className="col-6">{s.title}</span>

                                <div className="col-6">
                                  <div className="progress bg-dark" style={{height: '30px'}}>
                                    <div
                                      style={{
                                        width: `${Math.abs(s.years / 5) *
                                          100}%`,
                                      }}
                                      className="progress-bar"
                                      role="progressbar"
                                    >[ {s.years} years ]</div>
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
