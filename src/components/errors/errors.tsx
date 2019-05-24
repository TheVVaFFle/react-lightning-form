import React from "react";
import ReactDOM from "react-dom";
import * as _ from "lodash";

export interface ErrorsProps {
  tree: any;
}

export const Errors: React.SFC<ErrorsProps> = (props: ErrorsProps) => {
  const getErrors = (): JSX.Element | null => {
    //console.log(props.tree)
    return null;
  };

  return ReactDOM.createPortal(getErrors(), document.body);
};
