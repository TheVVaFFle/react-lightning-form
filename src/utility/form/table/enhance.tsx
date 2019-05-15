import React from "react";

import * as GeneralUtility from "../..";

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
  const onSelect = (id: string | number): void => {
    let updatedFormState: any = formState,
      key: string = GeneralUtility.kebabToCamelCase(child.props.id);

    const updateValue = (value: any[]): any[] => {
      return value.map((entry: any) => {
        if (entry.id.toString() === id.toString()) {
          entry.selected = !entry.selected;
        }

        return entry;
      });
    };

    updatedFormState[key] = {
      ...updatedFormState[key],
      value: updateValue(updatedFormState[key].value)
    };

    setUpdateCount(updateCount + 1);
    setFormState(updatedFormState);
  };

  return React.cloneElement(child, {
    ...child.props,
    onSelect
  });
};
