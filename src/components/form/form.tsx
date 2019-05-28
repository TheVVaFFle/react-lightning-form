import React from "react";
import { useState, useEffect } from "react";
import * as _ from "lodash";

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
  title?: string;
  data?: any;
  children?: any;
  options?: any;
  types?: any;
  validation?: any;
  messages?: any;
  submit?: any;
}

export const RLF: React.SFC<RLFProps> = (props: RLFProps) => {
  const [rawData, setRawData] = useState<any>(null),
    [mappedData, setMappedData] = useState<MappedDataItem[]>(new Array()),
    [editCount, setEditCount] = useState(0),
    [submitCount, setSubmitCount] = useState(0),
    [errorCount, setErrorCount] = useState(0),
    [errors, setErrors] = useState<any>({}),
    [validateOn, setValidateOn] = useState<string>("");

  useEffect(() => {
    if (props.data) {
      setRawData(props.data);
      setMappedData(RLFUtility.map.raw.data(props.data) || []);
    } else if (props.children) {
      const section: any = RLFUtility.map.section.data(props.children);

      setRawData(section.data);
      setMappedData(RLFUtility.map.raw.data(section.data) || []);
    }
  }, [props.data, errors]);

  useEffect(() => {
    if (errorCount > 0 || validateOn !== "") {
      validate();
    }

    if (validateOn !== "") {
      const data: any =
        validateOn === RLFValidateOn.Form
          ? rawData
          : _.get(rawData, validateOn);

      if (validate() && props.submit[validateOn]) {
        props.submit[validateOn](data);
        setValidateOn("");
      }
    }
  }, [editCount, validateOn]);

  useEffect(() => {
    if (errorCount === 0) {
      setValidateOn("");
    }
  }, [errorCount]);

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
      rawData,
      mappedData,
      validation,
      errors,
      updateErrors
    );
  };

  const updateData = (data: any) => {
    setRawData(data);
    setEditCount(editCount + 1);
  };

  const handleOnSubmit = (key: any): any => {
    setSubmitCount(submitCount + 1);
    setValidateOn(key);
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

  const components:
    | (JSX.Element | null)[]
    | null = RLFUtility.map.data.to.components(
    rawData,
    mappedData,
    props.options,
    props.types,
    props.validation,
    props.submit,
    errors,
    props.messages,
    updateData,
    handleOnSubmit
  );

  return (
    <div id={props.id || undefined} className="form">
      {getTitle()}
      {components}
      {getSubmitButton()}
      <Errors tree={errors} />
    </div>
  );
};
