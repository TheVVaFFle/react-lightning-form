import React from "react";
import classNames from "classnames";

import { Loading } from "../loading/loading";
import { Button } from "../enhanced/button";

export interface RLFSectionProps {
  id?: string;
  className?: string;
  title?: string;
  sectionKey?: string;
  data?: any;
  children?: any;
  submit?: any;
  loading?: boolean;
  onSubmit?: Function | null;
}

export const RLFSection: React.SFC<RLFSectionProps> = (
  props: RLFSectionProps
) => {
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
    if (props.sectionKey && props.submit && props.submit[props.sectionKey]) {
      const handleOnSubmit = (): any => {
        const onSubmit: Function = props.onSubmit
          ? props.onSubmit
          : (e: any) => {};

        if (!props.loading) {
          onSubmit(props.sectionKey);
        }
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

  const classes: string = classNames(
    "rlf-section",
    props.className,
    { "no-title": !props.title },
    { loading: props.loading }
  );

  return (
    <div id={props.id} className={classes}>
      {getTitle()}
      <div className="children">{props.children}</div>
      {getSubmitButton()}
      <Loading loading={props.loading} fullScreen={false} />
    </div>
  );
};
