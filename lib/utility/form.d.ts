import React from "react";
import { ValidationType } from "./validation";
export declare const FormUtility: {
  state: {
    create: (formState: any, children: any) => any;
    format: (formState: any) => any;
  };
  validate: {
    section: {
      submission: (
        formState: any,
        sectionState: any,
        setFormState: Function,
        setErrorCount: Function
      ) => boolean;
    };
    submission: (
      formState: any,
      setFormState: Function,
      setErrorCount: Function
    ) => boolean;
    children: (children: any) => boolean;
  };
  get: {
    title: (title: string | undefined) => JSX.Element | null;
    classes: (loading: boolean) => string;
    childType: (child: JSX.Element) => string;
    errorMessage: (errorCount: number) => JSX.Element | null;
    number: {
      of: {
        columns: (sm: number, md: number, lg: number) => number;
      };
    };
  };
  input: {
    mapAllFromData: (data: any) => JSX.Element[];
    handleChildren: (fields: JSX.Element) => any;
    enhance: (
      child: JSX.Element,
      formState: any,
      columns: number | undefined,
      index: number,
      updateCount: number,
      setUpdateCount: Function,
      setFormState: Function,
      handleOnSubmit: Function,
      alone?: boolean | undefined
    ) => JSX.Element;
    is: {
      radioGroup: (children: JSX.Element[]) => boolean;
    };
    convert: {
      to: {
        radioGroup: (children: JSX.Element[]) => JSX.Element;
      };
    };
    get: {
      onChange: (
        child: JSX.Element,
        formState: any,
        updateCount: number,
        setUpdateCount: Function,
        setFormState: Function
      ) => Function;
      classes: (child: JSX.Element, formState: any) => string;
      styles: (
        index: number,
        columns: number | undefined,
        alone?: boolean | undefined
      ) => React.CSSProperties;
      label: (child: JSX.Element) => JSX.Element | null;
      validationFn: (validate: Function | ValidationType) => string | null;
      errorMessage: (child: JSX.Element, formState: any) => JSX.Element | null;
    };
  };
};
