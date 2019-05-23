import React from "react";
import * as _ from "lodash";

import { StringUtility } from "../../utility";

export interface SelectProps {
  flatKey: string;
  name: string;
  label?: string;
  value?: string;
  options: string[];
  rawData: any;
  updateData: Function;
}

export const Select: React.SFC<SelectProps> = (props: SelectProps) => {
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

  const updateData = (value: string): void => {
    _.set(props.rawData, props.flatKey, value);
    props.updateData(props.rawData);
  };

  return (
    <div className="select">
      <h1 className="label">{label}</h1>
      <select
        id={props.flatKey}
        defaultValue={props.value || ""}
        onChange={(e: any) => updateData(e.target.value)}
      >
        <option value="">Select {label}</option>
        {getOptions()}
      </select>
    </div>
  );
};
