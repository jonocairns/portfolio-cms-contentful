import classnames from 'classnames';
import * as React from 'react';

import {breakpoints} from './breakpoints';

export interface Dictionary<T> {
  [key: string]: T | undefined;
}

interface Props {
  id: string;
  paddingSizes?: Dictionary<string>;
  className?: string;
}

export const ResponsiveSquare: React.FunctionComponent<Props> = ({
  id,
  children,
  paddingSizes,
  className,
}) => {
  const selector = `square-id-${id.replace(' ', '')}`;

  const topLeft: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
  };

  const defaultPadding = `.${selector} {
          padding-top: 90%;
        }
        @media (min-width: ${breakpoints.medium}px) {
          .${selector} {
          padding-top: 100%;
          }
        }`;

  const paddingStyle =
    paddingSizes &&
    `
            ${paddingSizes.small &&
              `.${selector} {
          padding-top: ${paddingSizes.small};
        }`}
            ${paddingSizes.medium &&
              `@media (min-width: ${breakpoints.medium}px) {
          .${selector} {
          padding-top: ${paddingSizes.medium};
          }
        }`}
            ${paddingSizes.large &&
              `@media (min-width: ${breakpoints.large}px) {
          .${selector} {
          padding-top: ${paddingSizes.large};
          }
        }`}`;

  return (
    <React.Fragment>
      <style>{paddingSizes ? paddingStyle : defaultPadding}</style>
      <div
        className={classnames(selector, className)}
        style={{position: 'relative'}}
      >
        {children && (
          <div className="w-100 h-100" style={topLeft}>
            {children}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
