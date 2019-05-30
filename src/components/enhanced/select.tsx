import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import classNames from "classnames";

import { StringUtility } from "../../utility";

export interface SelectProps {
  flatKey: string;
  name: string;
  label?: string;
  value?: string;
  options: string[];
  rawData: any;
  error: boolean;
  errorMessage?: string;
  onChange?: Function;
  updateData: Function;
}

export const Select: React.SFC<SelectProps> = (props: SelectProps) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setValue(props.value || "");
  }, [props.value]);

  const getOptions = (): JSX.Element[] => {
    if (props.options && Array.isArray(props.options)) {
      return props.options.map((value: string) => {
        return (
          <option key={value} value={value}>
            {value}
          </option>
        );
      });
    }

    return [];
  };

  const label: string =
    props.label || StringUtility.camelCaseToNormal(props.name);

  const classes: string = classNames("rlf-select rlf-input", {
    error: props.error
  });

  const updateData = (value: string): void => {
    _.set(props.rawData, props.flatKey, value);
    props.updateData(props.rawData);

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
      <select
        id={props.flatKey}
        value={value}
        onChange={(e: any) => updateData(e.target.value)}
      >
        <option value="">Select {label}</option>
        {getOptions()}
      </select>
      {getError()}
    </div>
  );
};
