import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import * as _ from "lodash";

import { FormUtility, StringUtility } from "../../utility";

export interface ErrorsProps {
  tree: any;
}

export const Errors: React.SFC<ErrorsProps> = (props: ErrorsProps) => {
  const [trackToggled, toggleTrack] = useState(true);

  const errors: any[] = FormUtility.get.errors(props.tree);

  const getErrorTrack = (): JSX.Element | null => {
    if (errors.length > 0) {
      const items: JSX.Element[] = errors.map((error: any) => {
        const element: any = document.getElementById(error.flatKey),
          style: React.CSSProperties = {};

        let handleOnClick: any = null;

        if (element !== null) {
          const rect: any = element.getBoundingClientRect(),
            top: number = rect.top + window.pageYOffset,
            height: number = document.body.offsetHeight,
            position: number = (top / height) * 100;
          style.top = `${position}%`;

          handleOnClick = () => {
            window.scrollTo(0, top - 30);
            if (!element.classList.contains("flash-error")) {
              element.classList.add("flash-error");
              setTimeout(() => {
                element.classList.remove("flash-error");
              }, 3100);
            }
          };
        }
        return (
          <div
            key={error.flatKey}
            className="error"
            style={style}
            onClick={handleOnClick}
          >
            <h1>{StringUtility.camelCaseToNormal(error.key)}</h1>
          </div>
        );
      });

      return (
        <div className={classNames("error-track", { toggled: trackToggled })}>
          {items}
          <div
            className="track-toggle"
            onClick={() => toggleTrack(!trackToggled)}
          />
        </div>
      );
    }

    return null;
  };

  const mapErrors = (): JSX.Element | null => {
    if (errors.length > 0) {
      let errorVerb: string = "is",
        errorText: string = "error",
        errorPronoun: string = "it";

      if (errors.length > 1) {
        errorVerb = "are";
        errorText = "errors";
        errorPronoun = "them";
      }

      return (
        <div className="error-box">
          <div className="label">
            <h1>
              There {errorVerb} currently{" "}
              <span
                className="underline"
                onClick={() => toggleTrack(!trackToggled)}
              >
                {errors.length} {errorText}
              </span>{" "}
              on the form. Please correct {errorPronoun} and try again.
            </h1>
          </div>
          {ReactDOM.createPortal(getErrorTrack(), document.body)}
        </div>
      );
    }

    return null;
  };

  return ReactDOM.createPortal(mapErrors(), document.body);
};
