import React from "react";
import classNames from "classnames";

export interface LoadingProps {
  fullScreen?: boolean;
}

export const Loading: React.SFC<LoadingProps> = (props: LoadingProps) => {
  const classes: string = classNames("loading-indicator", {
    "full-screen": props.fullScreen
  });
  return (
    <div className={classes}>
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
  );
};
