import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

export interface LoadingProps {
  loading?: boolean;
  fullScreen?: boolean;
}

export const Loading: React.SFC<LoadingProps> = (props: LoadingProps) => {
  const [loading, setLoading] = useState(false),
    [showing, setShowing] = useState(false);

  const fullScreen: boolean =
    props.fullScreen === undefined ? true : props.fullScreen;

  useEffect(() => {
    if (props.loading === true) {
      setLoading(true);
      setTimeout(() => {
        setShowing(true);
      }, 100);
    } else if (props.loading === false) {
      setShowing(false);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [props.loading]);

  const classes: string = classNames("rlf-loading-indicator", {
    "full-screen": fullScreen,
    showing: showing
  });

  const getIndicator = (): JSX.Element | null => {
    if (loading) {
      return (
        <div className={classes}>
          <div className="rlf-loading-spinner">
            <svg
              version="1.1"
              x="0px"
              y="0px"
              width="100px"
              height="100px"
              viewBox="0 0 50 50"
            >
              <path
                fill="rgb(3, 169, 244)"
                d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
              >
                <animateTransform
                  attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
        </div>
      );
    }

    return null;
  };

  if (props.fullScreen) {
    return ReactDOM.createPortal(getIndicator(), document.body);
  } else {
    return getIndicator();
  }
};
