import React from "react";
import { useState, useEffect } from "react";

import { Loading } from "../loading/loading";

import { FormUtility } from "../../utility/form";

export enum FormComponentType {
  Input = "input",
  TextArea = "textarea",
  Section = "section",
  Text = "text",
  Checkbox = "checkbox",
  Dropdown = "dropdown"
}

export interface FormProps {
  id?: string;
  title?: string;
  children: any;
  columns?: number;
  loading: boolean;
  onSubmit: (formState: any) => void;
}

export const Form: React.SFC<FormProps> = (props: FormProps) => {
  const defaultFormState: any = {},
    [formState, setFormState] = useState(defaultFormState),
    [updateCount, setUpdateCount] = useState(0),
    [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    setFormState(FormUtility.state.create(formState, props.children));
  }, []);

  const handleFormChildren = (children: JSX.Element[]): any => {
    let altIndex: number = 0;

    return React.Children.map(children, (child: JSX.Element) => {
      const type: string = FormUtility.get.childType(child);
      if (type === FormComponentType.Section) {
        altIndex = 0;

        const section: JSX.Element = child.type(child.props),
          fields: JSX.Element = section.props.children.find(
            (c: JSX.Element) => c && c.props.className === "fields"
          ),
          columns: number = child.props.columns || props.columns;

        let mappedChildren: JSX.Element[] = [];

        if (child.props.data) {
          mappedChildren = FormUtility.input.mapAllFromData(child.props.data);
        } else {
          mappedChildren = fields.props.children;
        }

        mappedChildren = React.Children.map(
          mappedChildren,
          (mappedChild: JSX.Element, index: number) => {
            const type: string = FormUtility.get.childType(mappedChild);
            if (type === FormComponentType.Section) {
              return handleFormChildren([mappedChild]);
            } else {
              return FormUtility.input.enhance(
                mappedChild,
                formState,
                columns,
                index,
                updateCount,
                setUpdateCount,
                setFormState,
                handleOnSubmit
              );
            }
          }
        );

        return React.cloneElement(child, {
          ...child.props,
          children: mappedChildren,
          formState
        });
      } else {
        return FormUtility.input.enhance(
          child,
          formState,
          props.columns,
          altIndex++,
          updateCount,
          setUpdateCount,
          setFormState,
          handleOnSubmit,
          true
        );
      }
    });
  };

  const handleOnSubmit = () => {
    if (
      !props.loading &&
      FormUtility.validate.submission(formState, setFormState, setErrorCount)
    ) {
      props.onSubmit(FormUtility.state.format(formState));
    }
  };

  return (
    <div
      id={props.id || undefined}
      className={FormUtility.get.classes(props.loading)}
    >
      <div className="form-contents">
        {FormUtility.get.title(props.title)}
        {handleFormChildren(props.children)}
        <div className="submit-button-wrapper">
          <button
            type="button"
            className="submit-button"
            onClick={handleOnSubmit}
          >
            Submit
          </button>
          {FormUtility.get.errorMessage(errorCount)}
        </div>
      </div>
      <Loading />
    </div>
  );
};
