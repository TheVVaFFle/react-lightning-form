import React from "react";
import classNames from "classnames";

import { Loading } from "../loading/loading";
import { Button } from "../enhanced/button";

export interface SectionProps {
  id?: string;
  title?: string;
  data?: any;
  children?: any;
  onSubmit?: Function;
}

export const Section: React.SFC<SectionProps> = (props: SectionProps) => {
  const getTitle = (): JSX.Element | null => {
    if (props.title) {
      return (
        <div className="title">
          <h1>{props.title}</h1>
        </div>
      );
    }

    return null;
  };

  const getSubmitButton = (): JSX.Element | null => {
    if (props.onSubmit) {
      const handleOnSubmit = (): any => {
        const onSubmit: Function = props.onSubmit
          ? props.onSubmit
          : (e: any) => {};

        onSubmit(props.data);
      };

      const label: string = props.title ? `Submit ${props.title}` : "Submit";

      return (
        <Button
          className="submit"
          label={label}
          handleOnClick={handleOnSubmit}
        />
      );
    }

    return null;
  };

  const classes: string = classNames("section", { "no-title": !props.title });

  return (
    <div id={props.id} className={classes}>
      {getTitle()}
      <div className="children">{props.children}</div>
      {getSubmitButton()}
    </div>
  );
};
