import React from "react"

import * as GeneralUtility from "../../utility";
import {ValidationType} from "../../utility/validation";

export interface CheckboxProps {
  key: string;
  id: string;
  value: boolean;
}

export const Checkbox: React.SFC<CheckboxProps> = (props: CheckboxProps) => {
  const formattedKey: string = GeneralUtility.camelCaseToNormal(props.id);

  return(
    <div className="checkbox">
      <input
        id={GeneralUtility.camelCaseToKebab(props.id)}
        key={props.id}
        type="checkbox"
        className="checkbox"
        checked={props.value}
        label={formattedKey}
      />    
    </div>
  )
}