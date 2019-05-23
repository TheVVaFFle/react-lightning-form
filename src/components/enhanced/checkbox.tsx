import React from "react";
import * as _ from "lodash";

import { StringUtility } from "../../utility";

export interface CheckboxProps {
  flatKey: string;
  name: string;
  label?: string;
  value: boolean;
  rawData: any;
  updateData: Function;
}

export const Checkbox = (props: CheckboxProps) => {
  const label: string =
    props.label || StringUtility.camelCaseToNormal(props.name);

  const updateData = (value: string): void => {
    _.set(props.rawData, props.flatKey, value);
    props.updateData(props.rawData);
  };

  return (
    <div className="checkbox">
      <input
        type="checkbox"
        defaultChecked={props.value}
        onChange={(e: any) => updateData(e.target.checked)}
      />
      <h1 className="label">{label}</h1>
      <div className="checkbox-toggle-track">
        <div className="checkbox-toggle" />
      </div>
    </div>
  );
};
