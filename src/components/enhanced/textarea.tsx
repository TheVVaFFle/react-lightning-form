import React from "react";
import * as _ from "lodash";

import { StringUtility } from "../../utility";

export interface TextAreaProps {
  flatKey: string;
  name: string;
  label?: string;
  value: string | number;
  rawData: any;
  updateData: Function;
}

export const TextArea: React.SFC<TextAreaProps> = (props: TextAreaProps) => {
  const label: string =
    props.label || StringUtility.camelCaseToNormal(props.name);

  const updateData = (value: string): void => {
    _.set(props.rawData, props.flatKey, value);
    props.updateData(props.rawData);
  };

  return (
    <div className="textarea">
      <h1 className="label">{label}</h1>
      <textarea
        id={props.flatKey}
        placeholder={`Enter ${label}`}
        defaultValue={props.value.toString()}
        onChange={(e: any) => updateData(e.target.value)}
      />
    </div>
  );
};
