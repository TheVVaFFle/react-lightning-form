import React from "react";
import { useState } from "react";
import classNames from "classnames";

import { Loading } from "../loading/loading";

import { FormUtility } from "../../utility/form";

export interface SectionProps {
  title?: string;
  children?: any;
  data?: any;
  columns?: number;
  loading?: boolean;
  onSubmit?: (formState: any) => void;
}

export const Section: React.SFC<SectionProps> = (props: SectionProps) => {
  const errorCount: number = 0;

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
    const classes: string = classNames("section", {
      "sub-section": props.title === undefined || props.title === null,
      loading: props.loading
    });

    return classes;
  };

  const handleOnSubmit = () => {
    if (props.onSubmit && !props.loading) {
      props.onSubmit("");
    }
  };

  const getSubmitButton = () => {
    if (props.onSubmit) {
      return (
        <div className="submit-button">
          <button
            type="button"
            className="submit-button"
            onClick={handleOnSubmit}
          >
            Submit
          </button>
          {FormUtility.get.errorMessage(errorCount)}
        </div>
      );
    }

    return null;
  };

  return (
    <div className={getClasses()}>
      {getTitle()}
      <div className="fields">{getChildren()}</div>
      {getSubmitButton()}
      <Loading />
    </div>
  );
};
