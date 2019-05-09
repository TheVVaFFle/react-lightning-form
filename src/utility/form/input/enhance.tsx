import React from "react";

import { get } from "./get";

import { FormComponentType } from "../../../components";

export const enhance: any = (
  child: JSX.Element,
  formState: any,
  columns: number | undefined,
  index: number,
  updateCount: number,
  setUpdateCount: Function,
  setFormState: Function,
  handleOnSubmit: Function,
  alone?: boolean
) => {
  const className: string = get.classes(child, formState),
    onChange: Function = get.onChange(
      child,
      formState,
      updateCount,
      setUpdateCount,
      setFormState
    ),
    style: React.CSSProperties = get.styles(index, columns, alone),
    label: JSX.Element | null = get.label(child),
    validate: string | null = get.validationFn(child.props.validate),
    errorMessage: JSX.Element | null = get.errorMessage(child, formState);

  let onKeyUp: Function | null = null;

  if (
    child.type !== FormComponentType.TextArea &&
    child.props.type !== FormComponentType.TextArea
  ) {
    onKeyUp = (e: any) => {
      if (e.key === "Enter") handleOnSubmit();
    };
  }

  if (child.props.type === FormComponentType.Checkbox) {
    return (
      <div className="input checkbox" style={style}>
        {label}
        {React.cloneElement(child, {
          ...child.props,
          className,
          validate,
          onChange,
          onKeyUp
        })}
        <div className="checkbox-toggle-track">
          <div className="checkbox-toggle" />
        </div>
        {errorMessage}
      </div>
    );
  } else if (child.props.type === FormComponentType.Radio) {
    return (
      <div
        key={child.props.id}
        id={child.props.id}
        className="input radio"
        style={style}
      >
        <div className="radio-button-wrapper">
          {React.cloneElement(child, {
            ...child.props,
            className,
            validate,
            onChange,
            onKeyUp
          })}
          <div className="border">
            <div className="center" />
          </div>
          <div className="ring" />
        </div>
        {label}
      </div>
    );
  } else if (child.props.type === FormComponentType.RadioGroup) {
    const radios: JSX.Element[] = child.props.children.map(
      (c: JSX.Element, i: number) => {
        return enhance(
          c,
          formState,
          columns,
          i,
          updateCount,
          setUpdateCount,
          setFormState,
          handleOnSubmit
        );
      }
    );

    return (
      <div id={child.props.id} className={className} type="radio-group">
        {label}
        <div className="radios">{radios}</div>
        {errorMessage}
      </div>
    );
  } else if (child.props.type === FormComponentType.Dropdown) {
    return (
      <div className="input dropdown" style={style}>
        {label}
        <div className="select-wrapper">
          {React.cloneElement(child, {
            ...child.props,
            className,
            validate,
            onChange,
            onKeyUp
          })}
          <div className="border" />
        </div>
        {errorMessage}
      </div>
    );
  } else if (child.props.type === FormComponentType.Text) {
    return (
      <div className="input text" style={style}>
        {label}
        {React.cloneElement(child, {
          ...child.props,
          className,
          validate,
          onChange,
          onKeyUp
        })}
        {errorMessage}
      </div>
    );
  } else if (
    child.type === FormComponentType.TextArea ||
    child.props.type === FormComponentType.TextArea
  ) {
    return (
      <div className="input textarea" style={style}>
        {label}
        {React.cloneElement(child, {
          ...child.props,
          className,
          validate,
          onChange,
          onKeyUp
        })}
        {errorMessage}
      </div>
    );
  } else {
    return child;
  }
};
