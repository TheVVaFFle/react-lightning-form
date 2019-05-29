import React from "react";
import * as _ from "lodash";
import classNames from "classnames";

import { StringUtility } from "../../utility";

export interface CheckboxProps {
  flatKey: string;
  name: string;
  label?: string;
  value: boolean;
  rawData: any;
  error: boolean;
  errorMessage?: string;
  updateData: Function;
}

export const Checkbox = (props: CheckboxProps) => {
  const label: string =
    props.label || StringUtility.camelCaseToNormal(props.name);

  const classes: string = classNames("rlf-checkbox rlf-input", {
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
      <input
        id={props.flatKey}
        type="checkbox"
        defaultChecked={props.value}
        onChange={(e: any) => updateData(e.target.checked)}
      />
      <h1 className="label">{label}</h1>
      <div className="checkbox-toggle-track">
        <div className="checkbox-toggle" />
      </div>
      {getError()}
    </div>
  );
};
