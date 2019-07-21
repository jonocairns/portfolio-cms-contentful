import {graphql, useStaticQuery, PageRendererProps, Link} from 'gatsby';
import React from 'react';

import facebook from '../../static/facebook_icon_asset.svg';
import linkedin from '../../static/linkedin_icon_asset.svg';
import vimeo from '../../static/vimeo_icon_asset.svg';
import {Layout} from '../components/layout';
import {SEO} from '../components/seo';

type Props = PageRendererProps;

const Contact = (props: Props) => {
  const query = graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `;

  const data = useStaticQuery(query);
  const siteTitle = data.site.siteMetadata.title;
  const isSuccess = props.location.search.indexOf('success') > -1;

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Ellie Earle" />
      <div className="pt-4">
        <div className="pb-4">
          <a className="mr-4" href="">
            <img style={{width: '40px'}} src={facebook} />
          </a>
          <a className="mr-4" href="">
            <img style={{width: '40px'}} src={linkedin} />
          </a>
          <a className="mr-4" href="">
            <img style={{width: '40px'}} src={vimeo} />
          </a>
        </div>

        {isSuccess && (
          <p>
            Thanks! You're message has been sent.{' '}
            <Link to={'/'}>take me home.</Link>
          </p>
        )}

        {!isSuccess && (
          <form
            name="contact"
            action="/contact?success"
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <div className="form-group">
              <label>Email address</label>
              <input
                required
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Please enter your contact email..."
              />
              <small id="emailHelp" className="form-text text-muted"></small>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="The subject of the message goes here..."
              />
            </div>

            <div className="form-group">
              <label>Body</label>
              <textarea
                required
                placeholder="Please enter your message here..."
                className="form-control"
                rows={3}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default Contact;
