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
  formState?: any;
  errorCount?: number;
  setFormState?: (formState: any) => void;
  setErrorCount?: (errorCount: boolean) => void;
  onSubmit?: (formState: any) => void;
}

export const Section: React.SFC<SectionProps> = (props: SectionProps) => {
  const errorCount: number = props.errorCount || 0,
    setFormState: Function = props.setFormState || new Function(),
    setErrorCount: Function = props.setErrorCount || new Function();

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

  const getSectionData = (props: any, sectionData: any) => {
    if (props.data) {
      return props.data;
    }

    if (props.children) {
      props.children.forEach((child: any) => {
        if (child.props.data) {
          sectionData = {
            ...sectionData,
            ...child.props.data
          };
        } else {
          getSectionData(child.prop, sectionData);
        }
      });
    }

    return sectionData;
  };

  const getSectionState = (): any => {
    let sectionState: any = {},
      sectionData: any = getSectionData(props, {});
    if (props.formState && sectionData) {
      Object.entries(sectionData).forEach((entry: any) => {
        const key = entry[0];
        sectionState[key] = props.formState[key];
      });
    }

    return sectionState;
  };

  const handleOnSubmit = (): void => {
    if (props.onSubmit && !props.loading) {
      const sectionState: any = getSectionState();

      if (
        FormUtility.validate.section.submission(
          props.formState,
          sectionState,
          setFormState,
          setErrorCount
        )
      ) {
        props.onSubmit(sectionState);
      }
    }
  };

  const getSubmitButton = (): JSX.Element | null => {
    if (props.onSubmit) {
      return (
        <div className="submit-button-wrapper">
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

  const getLoadingIndicator = (): JSX.Element | null => {
    if (props.onSubmit) {
      return <Loading />;
    }

    return null;
  };

  return (
    <div className={getClasses()}>
      {getTitle()}
      <div className="fields">{getChildren()}</div>
      {getSubmitButton()}
      {getLoadingIndicator()}
    </div>
  );
};
