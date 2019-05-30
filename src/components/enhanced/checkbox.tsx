import React, { useState, useEffect } from "react";
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
  onChange?: Function;
  updateData: Function;
}

export const Checkbox = (props: CheckboxProps) => {
  const [value, setValue] = useState<boolean>(false);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const label: string =
    props.label || StringUtility.camelCaseToNormal(props.name);

  const classes: string = classNames("rlf-checkbox rlf-input", {
    error: props.error
  });

  const updateData = (value: boolean): void => {
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
      <input
        id={props.flatKey}
        type="checkbox"
        checked={value}
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
