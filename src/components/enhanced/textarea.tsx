import React from "react";
import * as _ from "lodash";
import classNames from "classnames";

import { StringUtility } from "../../utility";

export interface TextAreaProps {
  flatKey: string;
  name: string;
  label?: string;
  value: string | number;
  rawData: any;
  error?: boolean;
  errorMessage?: string;
  updateData: Function;
}

export const TextArea: React.SFC<TextAreaProps> = (props: TextAreaProps) => {
  const label: string =
    props.label || StringUtility.camelCaseToNormal(props.name);

  const classes: string = classNames("textarea", { error: props.error });

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
      <textarea
        id={props.flatKey}
        placeholder={`Enter ${label}`}
        defaultValue={props.value.toString()}
        onChange={(e: any) => updateData(e.target.value)}
      />
      {getError()}
    </div>
  );
};
