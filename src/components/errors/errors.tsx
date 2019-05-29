import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import * as _ from "lodash";

import { RLFUtility, StringUtility } from "../../utility";

export interface ErrorsProps {
  tree: any;
  labels: any;
}

export const Errors: React.SFC<ErrorsProps> = (props: ErrorsProps) => {
  const [trackToggled, toggleTrack] = useState(true);

  let errors: any[] = RLFUtility.get.errors(props.tree);

  errors = RLFUtility.get.error.positions(errors);

  const getErrorTrack = (): JSX.Element | null => {
    if (errors.length > 0) {
      const items: JSX.Element[] = Object.entries(_.groupBy(errors, "position"))
        .map((entry: any) => ({ position: entry[0], errors: entry[1] }))
        .map((item: any) => {
          let handleOnClick: any = null,
            style: React.CSSProperties = {},
            label: string = "",
            elements: any[] = new Array();

          item.errors.forEach((error: any) => {
            const element: any = document.getElementById(error.flatKey),
              errorKey: string = StringUtility.camelCaseToNormal(error.key),
              formattedKey: string =
                _.get(props.labels, error.flatKey) || errorKey;

            style.top = `${error.position}%`;

            elements.push({
              node: element,
              position: error.position,
              top: error.top
            });

            label = item.errors.length === 1 ? formattedKey : "Multiple Errors";
          });

          handleOnClick = () => {
            if (elements.length > 0) {
              window.scrollTo(0, elements[0].top - 30);
              elements[0].node.focus();
              elements.forEach((element: any) => {
                if (!element.node.classList.contains("flash-error")) {
                  element.node.classList.add("flash-error");
                  setTimeout(() => {
                    element.node.classList.remove("flash-error");
                  }, 3100);
                }
              });
            }
          };

          return (
            <div
              key={Math.random()}
              className="error"
              style={style}
              onClick={handleOnClick}
            >
              <h1>{label}</h1>
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
