import React from "react";
import classNames from "classnames";

export interface ButtonProps {
  className?: string;
  label?: string;
  handleOnClick: () => void;
}

export const Button: React.SFC<ButtonProps> = (props: ButtonProps) => {
  const label: string = props.label || "Submit",
    classes: string = classNames(props.className, "button");
  return (
    <div className={classes}>
      <button className="submit-button" onClick={props.handleOnClick}>
        {label}
      </button>
    </div>
  );
};
