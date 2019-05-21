import React from "react";
import classNames from "classnames";

import { Loading } from "../loading/loading";

export interface SectionProps {
  id?: string;
  className?: string;
  title?: string;
  children?: any;
  data?: any;
  sm?: number;
  md?: number;
  lg?: number;
  loading?: boolean;
  outline?: boolean;
  styles?: React.CSSProperties;
  formState?: any;
  submitLabel?: string;
  onSubmit?: (e: any) => void;
}

export const Section: React.SFC<SectionProps> = (props: SectionProps) => {
  const getTitle = (): JSX.Element | null => {
    if (props.title !== undefined && props.title !== null) {
      return (
        <div className="title">
          <h1>{props.title}</h1>
        </div>
      );
    }

    return null;
  };

  const getChildren = (): JSX.Element[] | null => {
    return props.children || null;
  };

  const getClasses = (): string => {
    const classes: string = classNames("section", props.className, {
      outline: props.outline || false,
      loading: props.loading,
      "has-title": props.title
    });

    return classes;
  };

  const getSubmitButton = (): JSX.Element | null => {
    if (props.onSubmit) {
      return (
        <div className="submit-button-wrapper">
          <button
            type="button"
            className="submit-button"
            onClick={props.onSubmit}
          >
            {props.submitLabel || "Submit"}
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div id={props.id} className={getClasses()} style={props.styles}>
      {getTitle()}
      <div className="fields">{getChildren()}</div>
      {getSubmitButton()}
      <Loading />
    </div>
  );
};
