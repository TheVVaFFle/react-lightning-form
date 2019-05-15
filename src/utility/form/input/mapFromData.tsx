import React from "react";

import { FormComponentType } from "../../../components/form/form";
import { ValidationType } from "../../validation";

import * as GeneralUtility from "../..";

export const mapFromData = (data: any): JSX.Element[] => {
  const getValue = (v: any): string => {
    if (typeof v === "string") {
      return v;
    } else {
      return v.value ? v.value.toString() : "";
    }
  };

  const getInputForDataProperty = (key: string, v: any) => {
    const id: string = GeneralUtility.camelCaseToKebab(key),
      label: string = v.label || GeneralUtility.camelCaseToNormal(key);

    if (v.type !== undefined) {
      if (v.type === FormComponentType.Checkbox) {
        return (
          <input
            id={id}
            key={key}
            type="checkbox"
            className="checkbox"
            label={label}
          />
        );
      } else if (v.type === FormComponentType.Dropdown) {
        let options: JSX.Element[] = v.options.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ));
        options.unshift(
          <option key={-1} value="">
            Select an option
          </option>
        );
        return (
          <select
            id={id}
            key={key}
            type="dropdown"
            defaultValue={getValue(v)}
            label={label}
            validate={v.validate ? v.validate.toString() : null}
            errormessage={v.errormessage || "Error, invalid selection."}
          >
            {options}
          </select>
        );
      } else if (v.type === FormComponentType.TextArea) {
        return (
          <textarea
            id={id}
            key={key}
            defaultValue={getValue(v)}
            label={label}
            placeholder={`Enter ${label.toLowerCase()}`}
            validate={v.validate ? v.validate.toString() : null}
            errormessage={v.errormessage || "Error, invalid input."}
          />
        );
      } else if (v.type === FormComponentType.RadioGroup) {
        const options: JSX.Element[] = v.options.map((option: any) => {
          return (
            <input
              key={option}
              id={`favorite-color-${option.toLowerCase()}`}
              type="radio"
              name={v.name}
              label={option}
              value={option}
            />
          );
        });

        return (
          <div
            id={v.name}
            className="radio-group"
            type="radio-group"
            validate={v.validate ? v.validate.toString() : null}
          >
            {options}
          </div>
        );
      }
    }

    return (
      <input
        id={GeneralUtility.camelCaseToKebab(key)}
        key={key}
        type="text"
        className="text-input"
        defaultValue={getValue(v)}
        placeholder={`Enter ${label.toLowerCase()}`}
        label={label}
        validate={ValidationType.Required}
      />
    );
  };

  return Object.entries(data).map((entry: any) => {
    const key: string = entry[0],
      value: string | number = entry[1];
    return getInputForDataProperty(key, value);
  });
};
