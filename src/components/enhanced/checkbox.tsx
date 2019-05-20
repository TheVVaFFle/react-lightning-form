import React, { ChangeEvent } from "react";

export interface CheckboxProps {
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = (props: CheckboxProps) => {
  return (
    <div className="input checkbox">
      <input type="checkbox" onChange={props.handleOnChange} />
      <div className="checkbox-toggle-track">
        <div className="checkbox-toggle" />
      </div>
    </div>
  );
};
