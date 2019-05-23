import React from "react";
import { useState, useEffect } from "react";

import { Button } from "../enhanced/button";
import { Loading } from "../loading/loading";

import { FormUtility } from "../../utility";
import { MappedDataItem } from "../../utility/form";

export enum RLFComponentType {
  Button = "button",
  Checkbox = "checkbox",
  Textarea = "textarea",
  Dropdown = "dropdown",
  Text = "text"
}

export interface FormProps {
  id?: string;
  title?: string;
  data?: any;
  children?: any;
  options?: any;
  onSubmit: Function;
}

export const Form: React.SFC<FormProps> = (props: FormProps) => {
  const [rawData, setRawData] = useState<any>(null),
    [mappedData, setMappedData] = useState<MappedDataItem[]>(new Array()),
    [submitHandlers, setSubmitHandlers] = useState<Function[]>(new Array());

  useEffect(() => {
    if (props.data) {
      setRawData(props.data);
      setMappedData(FormUtility.map.raw.data(props.data));
    } else if (props.children) {
      const section: any = FormUtility.map.section.data(props.children);

      setRawData(section.data);
      setSubmitHandlers(section.submit);
      setMappedData(FormUtility.map.raw.data(section.data));
    }
  }, [props.data]);

  const handleOnSubmit = (): any => {
    props.onSubmit(rawData);
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
    if (props.onSubmit) {
      return (
        <Button
          className="submit"
          label="Submit Form"
          handleOnClick={handleOnSubmit}
        />
      );
    }

    return null;
  };

  const components:
    | (JSX.Element | null)[]
    | null = FormUtility.map.data.to.components(
    rawData,
    mappedData,
    props.options,
    submitHandlers,
    setRawData
  );

  return (
    <div id={props.id || undefined} className="form">
      {getTitle()}
      {components}
      {getSubmitButton()}
    </div>
  );
};
