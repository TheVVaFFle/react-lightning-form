import React from "react";
import classNames from "classnames";

import { Loading } from "../loading/loading";

export interface SectionProps {
  id?: string;
  title?: string;
  data?: any;
  children?: any;
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

  const classes: string = classNames("section", { "no-title": !props.title });

  return (
    <div id={props.id} className={classes}>
      {getTitle()}
      <div className="children">{props.children}</div>
    </div>
  );
};
