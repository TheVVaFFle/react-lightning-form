import React from "react";
import classNames from "classnames";

export interface SectionProps {
  title?: string;
  children?: any;
  data?: any;
  sm?: number;
  md?: number;
  lg?: number;
  loading?: boolean;
  outline?: boolean;
  formState?: any;
}

export const Section: React.SFC<SectionProps> = (props: SectionProps) => {
  const getTitle = (): JSX.Element | null => {
    if (props.title !== undefined && props.title !== null) {
      return (
        <div className="title">
          <h1>{props.title}</h1>
        </div>
      );
    }

    return null;
  };

  const getChildren = (): JSX.Element[] | null => {
    return props.children || null;
  };

  const getClasses = (): string => {
    const classes: string = classNames("section", {
      outline: props.outline !== undefined ? props.outline : true,
      loading: props.loading
    });

    return classes;
  };

  return (
    <div className={getClasses()}>
      {getTitle()}
      <div className="fields">{getChildren()}</div>
    </div>
  );
};
