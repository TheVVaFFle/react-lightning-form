import React from "react";
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
  updateData: Function;
}

export const Text: React.SFC<TextProps> = (props: TextProps) => {
  const label: string =
    props.label || StringUtility.camelCaseToNormal(props.name);

  const classes: string = classNames("rlf-text rlf-input", {
    error: props.error
  });

  const updateData = (value: string): void => {
    _.set(props.rawData, props.flatKey, value);
    props.updateData(props.rawData);
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
        defaultValue={props.value.toString()}
        onChange={(e: any) => updateData(e.target.value)}
      />
      {getError()}
    </div>
  );
};
