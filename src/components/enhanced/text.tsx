import React from "react";
import * as _ from "lodash";

import { StringUtility } from "../../utility";

export interface TextProps {
  flatKey: string;
  name: string;
  label?: string;
  value: string | number;
  rawData: any;
  updateData: Function;
}

export const Text: React.SFC<TextProps> = (props: TextProps) => {
  const label: string =
    props.label || StringUtility.camelCaseToNormal(props.name);

  const updateData = (value: string): void => {
    _.set(props.rawData, props.flatKey, value);
    props.updateData(props.rawData);
  };

  return (
    <div className="text">
      <h1 className="label">{label}</h1>
      <input
        id={props.flatKey}
        type="text"
        placeholder={`Enter ${label}`}
        defaultValue={props.value.toString()}
        onChange={(e: any) => updateData(e.target.value)}
      />
    </div>
  );
};
