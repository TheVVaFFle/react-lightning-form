import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import classNames from "classnames";

import { StringUtility } from "../../utility";

import { RLFComponentType } from "../form/form";

export interface TextProps {
  flatKey: string;
  name: string;
  label?: string;
  value: string | number;
  rawData: any;
  error?: boolean;
  errorMessage?: string;
  onChange?: Function;
  updateData: Function;
}

export const Text: React.SFC<TextProps> = (props: TextProps) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setValue(props.value.toString());
  }, [props.value]);

  const label: string =
    props.label || StringUtility.camelCaseToNormal(props.name);

  const classes: string = classNames("rlf-text rlf-input", {
    error: props.error
  });

  const updateData = (value: string): void => {
    _.set(props.rawData, props.flatKey, value);
    props.updateData(props.rawData);
    setValue(value);

    if (props.onChange) {
      props.onChange(value);
    }
  };

  const getError = (): JSX.Element | null => {
    if (props.error && props.errorMessage) {
      return <h1 className="error-message">{props.errorMessage}</h1>;
    }

    return null;
  };

  return (
    <div className={classes}>
      <h1 className="label">{label}</h1>
      <input
        id={props.flatKey}
        type="text"
        placeholder={`Enter ${label}`}
        value={value}
        onChange={(e: any) => updateData(e.target.value)}
      />
      {getError()}
    </div>
  );
};
