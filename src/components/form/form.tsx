import React from "react";
import { useState, useEffect } from "react";
import * as _ from "lodash";
import classNames from "classnames";

import { Button } from "../enhanced/button";
import { Loading } from "../loading/loading";
import { Errors } from "../errors/errors";

import { RLFUtility } from "../../utility";
import { MappedDataItem } from "../../utility/form";

export enum RLFComponentType {
  Button = "button",
  Checkbox = "checkbox",
  Textarea = "textarea",
  Dropdown = "dropdown",
  Text = "text"
}

export enum RLFValidationType {
  Required = "required"
}

export enum RLFValidateOn {
  Form = "form"
}

export interface RLFProps {
  id?: string;
  className?: string;
  title?: string;
  data?: any;
  children?: any;
  labels?: any;
  options?: any;
  types?: any;
  validation?: any;
  messages?: any;
  loading?: boolean;
  submit?: any;
}

export const RLF: React.SFC<RLFProps> = (props: RLFProps) => {
  const [originalData, setOriginalData] = useState<any>(null),
    [mappedData, setMappedData] = useState<MappedDataItem[]>(new Array()),
    [editCount, setEditCount] = useState(0),
    [submitCount, setSubmitCount] = useState(0),
    [errorCount, setErrorCount] = useState(0),
    [errors, setErrors] = useState<any>({}),
    [submitting, setSubmitting] = useState(false),
    [validateOn, setValidateOn] = useState<string>("");

  useEffect(() => {
    if (props.data) {
      setOriginalData(props.data);
      setMappedData(RLFUtility.map.raw.data(props.data) || []);
    } else if (props.children) {
      const section: any = RLFUtility.map.section.data(props.children),
        merged: any = _.merge({ ...section.data }, { ...originalData });
      setOriginalData(merged);
      setMappedData(RLFUtility.map.raw.data(merged) || []);
    }
  }, [props.data, props.children, props.options, errors]);

  useEffect(() => {
    if (errorCount > 0 || validateOn !== "") {
      validate();
    }

    if (validateOn !== "") {
      const data: any =
        validateOn === RLFValidateOn.Form
          ? originalData
          : _.get(originalData, validateOn);

      if (validate() && props.submit[validateOn] && submitting) {
        props.submit[validateOn](data);
        setValidateOn("");
      }
    }
  }, [editCount, validateOn]);

  useEffect(() => {
    if (errorCount === 0) setValidateOn("");
  }, [errorCount]);

  useEffect(() => {
    if (submitting === true) setSubmitting(false);
  }, [submitting]);

  const validate = (): boolean => {
    const updateErrors = (errors: any): void => {
      const flatErrors: any[] = RLFUtility.get.errors(errors);
      setErrorCount(flatErrors.length);
      setErrors(errors);
    };

    let validation: any = {},
      errors: any = {};

    if (validateOn === RLFValidateOn.Form) {
      validation = props.validation;
    } else {
      _.set(validation, validateOn, _.get(props.validation, validateOn));
      errors = {};
    }

    return RLFUtility.validate.data(
      originalData,
      mappedData,
      validation,
      errors,
      updateErrors
    );
  };

  const updateData = (data: any) => {
    setOriginalData(data);
    setEditCount(editCount + 1);
  };

  const handleOnSubmit = (key: any): any => {
    if (!props.loading) {
      setSubmitCount(submitCount + 1);
      setValidateOn(key);
      setSubmitting(true);
    }
  };

  const getTitle = (): JSX.Element | null => {
    if (props.title) {
      return (
        <div className="title">
          <h1>{props.title}</h1>
        </div>
      );
    }

    return null;
  };

  const getSubmitButton = (): JSX.Element | null => {
    if (props.submit && props.submit.form) {
      return (
        <Button
          className="submit"
          label="Submit Form"
          handleOnClick={() => handleOnSubmit(RLFValidateOn.Form)}
        />
      );
    }

    return null;
  };

  const classes: string = classNames("rlf-form", props.className, {
    "rlf-loading": props.loading
  });

  const section: any = RLFUtility.map.section.data(props.children);

  const components:
    | (JSX.Element | null)[]
    | null = RLFUtility.map.data.to.components(
    originalData,
    mappedData,
    props.labels,
    props.options,
    props.types,
    props.validation,
    props.submit,
    section.id,
    section.className,
    section.loading,
    errors,
    props.messages,
    updateData,
    handleOnSubmit
  );

  return (
    <div id={props.id || undefined} className={classes}>
      {getTitle()}
      {components}
      {getSubmitButton()}
      <Loading loading={props.loading} />
      <Errors tree={errors} labels={props.labels} />
    </div>
  );
};
