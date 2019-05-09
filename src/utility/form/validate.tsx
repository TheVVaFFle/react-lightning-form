import React from "react";
import { ValidationType } from "../../components";

import { Validate } from "../validation";

export const validate: any = {
  submission: (
    formState: any,
    setFormState: Function,
    setErrorCount: Function
  ): boolean => {
    let nErrors: number = 0,
      updatedFormState: any = formState;

    Object.entries(formState).map((entry: any) => {
      const key = entry[0],
        prop = entry[1];

      let validationFn: Function | null = null;

      if (prop.validate !== undefined) {
        if (!Object.values(ValidationType).includes(prop.validate)) {
          validationFn = eval(prop.validate);
        } else {
          validationFn = Validate[prop.validate];
        }
      }

      if (Validate.determineIfError(prop.value, validationFn)) {
        updatedFormState[key].error = true;
        nErrors++;
      } else {
        updatedFormState[key].error = false;
      }
    });

    setFormState(updatedFormState);
    setErrorCount(nErrors);

    return nErrors === 0;
  },
  children: (children: any): boolean => {
    if (Array.isArray(children)) {
      let invalidCount: number = 0;
      children.forEach((child: any) => {
        if (!React.isValidElement(child)) {
          invalidCount++;
        }
      });
      return invalidCount === 0;
    } else {
      return React.isValidElement(children);
    }
  }
};
