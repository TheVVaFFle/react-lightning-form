import React from "react";
import classNames from "classnames";

export const get: any = {
  title: (title: string | undefined): JSX.Element | null => {
    if (title !== undefined) {
      return (
        <div className="title">
          <h1>{title}</h1>
        </div>
      );
    }

    return null;
  },
  classes: (loading: boolean) => classNames("form", { loading: loading }),
  childType: (child: JSX.Element): string => {
    return typeof child.type === "string"
      ? child.type
      : child.type(child.props).props.className.split(" ")[0];
  },
  errorMessage: (errorCount: number): JSX.Element | null => {
    const classes: string = classNames("error-message", {
      show: errorCount > 0
    });

    const errorVerb: String = errorCount > 1 ? "are" : "is",
      errorText: string = errorCount > 1 ? "errors" : "error";
    return (
      <h1 className={classes}>
        There {errorVerb} currently {errorCount} {errorText}. Please correct
        before submitting.
      </h1>
    );
  },
  number: {
    of: {
      columns: (sm: number, md: number, lg: number) => {
        sm = sm || 1;
        md = md || sm;
        lg = lg || md;

        if (window.innerWidth >= 1400) {
          return lg;
        } else if (window.innerWidth >= 800) {
          return md;
        } else {
          return sm;
        }
      }
    }
  }
};
