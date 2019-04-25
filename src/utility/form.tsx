import React, { Children } from "react";
import classNames from "classnames";

import { FormComponentType } from "../components/form/form";
import { Validate, ValidationType } from "./validation";
import * as GeneralUtility from "./";

export const FormUtility = {
  state: {
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
              updatedFormState[child.props.id] = {
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
                  (c: JSX.Element) => c.props.className === "fields"
                );
              FormUtility.state.create(formState, fields.props.children);
            } else {
              FormUtility.state.create(formState, child.props.data);
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
  },
  validate: {
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
  },
  get: {
    title: (title: string | undefined): JSX.Element | null => {
      if (title !== undefined) {
        return (
          <div className="title">
            <h1>{title}</h1>
          </div>
        );
      }

      return null;
    },
    classes: (loading: boolean) => classNames("form", { loading: loading }),
    childType: (child: JSX.Element): string => {
      return typeof child.type === "string"
        ? child.type
        : child.type(child.props).props.className.split(" ")[0];
    },
    errorMessage: (errorCount: number): JSX.Element | null => {
      const classes: string = classNames("error-message", {
        show: errorCount > 0
      });
      const errorVerb: String = errorCount > 1 ? "are" : "is",
        errorText: string = errorCount > 1 ? "errors" : "error";
      return (
        <h1 className={classes}>
          There {errorVerb} currently {errorCount} {errorText}. Please correct
          before submitting.
        </h1>
      );
    }
  },
  input: {
    mapAllFromData: (data: any): JSX.Element[] => {
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
                validate={v.validate.toString()}
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
                validate={v.validate.toString()}
                errormessage={v.errormessage || "Error, invalid input."}
              />
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
    },
    enhance: (
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
      const className: string = FormUtility.input.get.classes(child, formState),
        onChange: Function = FormUtility.input.get.onChange(
          child,
          formState,
          updateCount,
          setUpdateCount,
          setFormState
        ),
        style: React.CSSProperties = FormUtility.input.get.styles(
          index,
          columns,
          alone
        ),
        label: JSX.Element | null = FormUtility.input.get.label(child),
        validate: string | null = FormUtility.input.get.validationFn(
          child.props.validate
        ),
        errorMessage: JSX.Element | null = FormUtility.input.get.errorMessage(
          child,
          formState
        );

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
    },
    get: {
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
            key: string = GeneralUtility.kebabToCamelCase(child.props.id);

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
        const classes: string = classNames(
          child.props.className,
          {
            error: formState[child.props.id] && formState[child.props.id].error
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
      errorMessage: (
        child: JSX.Element,
        formState: any
      ): JSX.Element | null => {
        const error: boolean =
            formState[child.props.id] && formState[child.props.id].error,
          input: string = formState[child.props.id]
            ? formState[child.props.id].value
            : "",
          type: string = formState[child.props.id]
            ? formState[child.props.id].validate
            : "";

        const classes: string = classNames("error-message", { show: error });

        return (
          <h1 className={classes}>
            {Validate.getErrorMessage(type, input, child)}
          </h1>
        );
      }
    }
  }
};
