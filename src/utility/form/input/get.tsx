import React from "react";
import classNames from "classnames";

import { FormComponentType, ValidationType } from "../../../components";

import * as GeneralUtility from "../..";
import { Validate } from "../../validation";

export const get: any = {
  onChange: (
    child: JSX.Element,
    formState: any,
    updateCount: number,
    setUpdateCount: Function,
    setFormState: Function
  ): Function => {
    const onChange = (e: any) => {
      const getValue = () => {
        if (child.props.type === FormComponentType.Checkbox) {
          return e.target.checked;
        } else {
          return e.target.value;
        }
      };

      let updatedFormState: any = formState,
        key: string = "";

      if (child.props.type === FormComponentType.Radio) {
        key = GeneralUtility.kebabToCamelCase(child.props.name);
      } else {
        key = GeneralUtility.kebabToCamelCase(child.props.id);
      }

      updatedFormState[key] = {
        ...formState[key],
        value: getValue()
      };

      setUpdateCount(updateCount + 1);
      setFormState(updatedFormState);
    };

    return onChange;
  },
  classes: (child: JSX.Element, formState: any): string => {
    const key: string = GeneralUtility.kebabToCamelCase(child.props.id);

    const classes: string = classNames(
      child.props.className,
      {
        error: formState[key] && formState[key].error
      },
      { "scroll-bar": child.type === FormComponentType.TextArea }
    );

    return classes;
  },
  styles: (
    index: number,
    columns: number | undefined,
    alone?: boolean
  ): React.CSSProperties => {
    columns = columns !== undefined && columns !== -1 ? columns : 1;
    const row: number = (index + 1) / columns,
      width: string = `calc(${100 / columns}% - ${((columns - 1) * 20) /
        columns}px)`,
      marginLeft: string = index % columns === 0 ? "0px" : "20px",
      marginTop: string = row > 1 || alone ? "20px" : "0px";

    return { width, marginLeft, marginTop };
  },
  label: (child: JSX.Element): JSX.Element | null => {
    if (child.props.label) {
      return <h1 className="label">{child.props.label}</h1>;
    } else if (
      child.props.type === FormComponentType.Radio &&
      child.props.value
    ) {
      return <h1 className="label">{child.props.value}</h1>;
    } else if (child.props.type === FormComponentType.RadioGroup) {
      return (
        <h1 className="label">
          {GeneralUtility.kebabToNormal(child.props.id)}
        </h1>
      );
    }

    return null;
  },
  validationFn: (validate: ValidationType | Function): string | null => {
    if (typeof validate === "function") {
      return validate.toString();
    } else if (!Object.values(ValidationType).includes(validate)) {
      return validate;
    } else {
      return null;
    }
  },
  errorMessage: (child: JSX.Element, formState: any): JSX.Element | null => {
    const key: string = GeneralUtility.kebabToCamelCase(child.props.id),
      error: boolean = formState[key] && formState[key].error,
      input: string = formState[key] ? formState[key].value : "",
      type: string = formState[key] ? formState[key].validate : "";

    const classes: string = classNames("error-message", { show: error });

    return (
      <h1 className={classes}>
        {Validate.getErrorMessage(type, input, child)}
      </h1>
    );
  }
};
