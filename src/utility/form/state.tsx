import React from "react";
import { FormComponentType } from "../../components/form/form";
import { FormUtility } from ".";
import * as GeneralUtility from "..";

export const state: any = {
  create: (formState: any, children: JSX.Element[] | any) => {
    let updatedFormState: any = formState;

    if (FormUtility.validate.children(children)) {
      React.Children.forEach(children, (child: JSX.Element) => {
        const type: string = FormUtility.get.childType(child);

        if (
          type === FormComponentType.Input ||
          type === FormComponentType.TextArea
        ) {
          if (child.props.id !== undefined && child.props.id !== null) {
            let key: string = "";

            if (child.props.type === FormComponentType.Radio) {
              key = GeneralUtility.kebabToCamelCase(child.props.name);
            } else {
              key = GeneralUtility.kebabToCamelCase(child.props.id);
            }

            updatedFormState[key] = {
              value: child.props.defaultValue || "",
              validate: child.props.validate || null,
              error: false
            };
          } else {
            throw Error("All form fields must have an id.");
          }
        } else if (type === FormComponentType.Section) {
          if (child.props.children) {
            const section: JSX.Element = child.type(child.props),
              fields: JSX.Element = section.props.children.find(
                (c: JSX.Element) => c && c.props.className === "fields"
              );
            state.create(formState, fields.props.children);
          } else {
            state.create(formState, child.props.data);
          }
        } else {
          return child;
        }
      });
    } else {
      const getValue = (v: any) => {
        if (typeof v === "string") {
          return {
            value: v,
            validate: null,
            error: false
          };
        } else {
          return {
            value: v.value,
            validate: v.validate,
            error: false
          };
        }
      };

      Object.entries(children).map((entry: any) => {
        const key: string = entry[0],
          value: string | number = entry[1];
        updatedFormState[key] = getValue(value);
      });
    }

    return updatedFormState;
  },
  format: (formState: any) => {
    let formattedFormState: any = { ...formState };

    Object.entries(formState).map((entry: any) => {
      const key = entry[0],
        prop = entry[1];
      formattedFormState[key] = prop.value;
    });

    return formattedFormState;
  }
};
