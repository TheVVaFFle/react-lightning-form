import React from "react";
import * as _ from "lodash";

import { Section } from "../components/section/section";
import { Text } from "../components/enhanced/text";
import { Select } from "../components/enhanced/select";
import { Checkbox } from "../components/enhanced/checkbox";
import { TextArea } from "../components/enhanced/textarea";

import { StringUtility } from ".";

import { RLFComponentType, RLFValidationType } from "../components/form/form";

export enum ObjectType {
  Null = "null",
  Undefined = "undefined",
  String = "string",
  Number = "number",
  Boolean = "boolean",
  Array = "array",
  Object = "object"
}

export interface MappedDataItem {
  key: string;
  flatKey?: string;
  type: ObjectType;
  arrayType: ObjectType;
  value: any;
  children?: MappedDataItem[];
}

export const FormUtility = {
  get: {
    obj: {
      type: (obj: any): ObjectType | string => {
        if (obj === undefined) {
          return ObjectType.Undefined;
        } else if (obj === null) {
          return ObjectType.Null;
        } else if (Array.isArray(obj)) {
          return ObjectType.Array;
        } else {
          return typeof obj;
        }
      }
    },
    error: {
      message: (item: MappedDataItem, validation: any): string => {
        const flatKey: string = FormUtility.format.flatKey.for.validation(
            item.flatKey
          ),
          validationType: RLFValidationType | Function | null =
            _.get(validation, flatKey) || null;

        if (validationType === RLFValidationType.Required) {
          const field: string = StringUtility.camelCaseToNormal(item.key);
          if (item.type === ObjectType.Boolean) {
            return `${field} must be selected.`;
          }

          return `${field} is a required field.`;
        }

        return "Error!";
      },
      positions: (errors: any): any[] => {
        return errors.map((error: any) => {
          const element: any = document.getElementById(error.flatKey);

          if (element) {
            const rect: any = element.getBoundingClientRect(),
              top: number = rect.top + window.pageYOffset,
              height: number = document.body.offsetHeight,
              position: number = (top / height) * 100;

            error.position = position;
            error.top = top;
          }

          return error;
        });
      }
    },
    errors: (tree: any) => {
      const mappedTree: MappedDataItem[] | null = FormUtility.map.raw.data(
        tree
      );

      let errors: any[] = new Array();

      const check = (item: MappedDataItem): void => {
        if (item.type === ObjectType.Boolean && item.value === true) {
          errors.push({ key: item.key, flatKey: item.flatKey });
        } else {
          flatten(item.children || []);
        }
      };

      const flatten = (
        tree: MappedDataItem | MappedDataItem[] | null
      ): void => {
        if (tree !== null) {
          if (Array.isArray(tree)) {
            tree.forEach((item: MappedDataItem | MappedDataItem[]) => {
              if (!Array.isArray(item)) {
                check(item);
              } else {
                item.forEach((i: MappedDataItem) => flatten(i));
              }
            });
          } else {
            check(tree);
          }
        }
      };

      flatten(mappedTree);

      return errors;
    },
    rlfComponentType: (
      item: MappedDataItem,
      types: any
    ): RLFComponentType | null => {
      const type: RLFComponentType = _.get(types, item.flatKey || "");

      return type || null;
    }
  },
  map: {
    raw: {
      data: (data: any, parent: string = ""): MappedDataItem[] | null => {
        if (data === undefined || data === null) {
          return null;
        }

        return Object.entries(data).map((entry: any) => {
          entry = {
            key: entry[0],
            value: entry[1],
            type: FormUtility.get.obj.type(entry[1]),
            flatKey: entry[0]
          };

          if (parent) {
            entry = { ...entry, flatKey: `${parent}.${entry.flatKey}` };
          }

          if (entry.type === ObjectType.Object) {
            entry = {
              ...entry,
              children: FormUtility.map.raw.data(entry.value, entry.key)
            };
          } else if (entry.type === ObjectType.Array) {
            const children: any = entry.value.map(
              (v: MappedDataItem, i: number) =>
                FormUtility.map.raw.data(v, `${entry.flatKey}.${i}`)
            );

            entry = {
              ...entry,
              children,
              arrayType: FormUtility.get.obj.type(entry.value[0])
            };
          }

          return entry;
        });
      }
    },
    section: {
      data: (children: any) => {
        let data: any = {},
          submit: any = {};

        React.Children.map(children, (child: any) => {
          const keys: string[] = Object.keys(child.props.data);

          data = { ...data, ...child.props.data };
          submit[keys[0]] = child.props.onSubmit;
        });

        return {
          data,
          submit
        };
      }
    },
    data: {
      to: {
        components: (
          rawData: any,
          mappedData: MappedDataItem[] | undefined,
          options: any,
          types: any,
          validation: any,
          errors: any,
          submitHandlers: Function[],
          validateOn: Function,
          updateData: Function
        ): (JSX.Element | null)[] | null => {
          if (mappedData === undefined || mappedData === null) {
            return null;
          }

          return mappedData.map(
            (item: MappedDataItem): JSX.Element | null => {
              const itemOptions: any | undefined = options
                ? Object.entries(options)
                    .map((entry: any) => ({ key: entry[0], value: entry[1] }))
                    .find((o: any) => o.key === item.key)
                : undefined;

              const rlfComponentType: RLFComponentType | null = FormUtility.get.rlfComponentType(
                item,
                types
              );

              const error: boolean = _.get(errors, item.flatKey || "") || false,
                errorMessage: string = FormUtility.get.error.message(
                  item,
                  validation
                );

              if (rlfComponentType) {
                return FormUtility.handle.rlfComponent(
                  item,
                  rlfComponentType,
                  rawData,
                  error,
                  errorMessage,
                  updateData
                );
              } else if (item.type === ObjectType.Object) {
                return FormUtility.handle.object(
                  item,
                  rawData,
                  options,
                  types,
                  validation,
                  errors,
                  submitHandlers,
                  validateOn,
                  updateData
                );
              } else if (
                item.type === ObjectType.Array ||
                itemOptions !== undefined
              ) {
                return FormUtility.handle.array(
                  item,
                  rawData,
                  options,
                  types,
                  itemOptions,
                  validation,
                  errors,
                  submitHandlers,
                  validateOn,
                  updateData
                );
              } else if (
                item.type === ObjectType.String ||
                item.type === ObjectType.Number
              ) {
                return FormUtility.handle.alphaNumeric(
                  item,
                  rawData,
                  error,
                  errorMessage,
                  updateData
                );
              } else if (item.type === ObjectType.Boolean) {
                return FormUtility.handle.boolean(
                  item,
                  rawData,
                  error,
                  errorMessage,
                  updateData
                );
              } else if (Array.isArray(item)) {
                return FormUtility.handle.mappedArray(
                  item,
                  rawData,
                  options,
                  types,
                  validation,
                  errors,
                  submitHandlers,
                  validateOn,
                  updateData
                );
              } else {
                return <div key={item.key} />;
              }
            }
          );
        }
      }
    }
  },
  handle: {
    object: (
      item: MappedDataItem,
      rawData: any,
      options: any,
      types: any,
      validation: any,
      errors: any,
      submitHandlers: Function[],
      validateOn: Function,
      updateData: Function
    ) => {
      const title: string | undefined = isNaN(parseInt(item.key))
        ? StringUtility.camelCaseToNormal(item.key)
        : undefined;

      return (
        <Section
          key={item.key}
          sectionKey={item.key}
          title={title}
          data={item.value}
          validateOn={validateOn}
          onSubmit={_.get(submitHandlers, item.key)}
        >
          {FormUtility.map.data.to.components(
            rawData,
            item.children,
            options,
            types,
            validation,
            errors,
            submitHandlers,
            validateOn,
            updateData
          )}
        </Section>
      );
    },
    array: (
      item: MappedDataItem,
      rawData: any,
      options: any,
      types: any,
      itemOptions: any | undefined,
      validation: any,
      errors: any,
      submitHandlers: Function[],
      validateOn: Function,
      updateData: Function
    ) => {
      if (
        item.arrayType === ObjectType.String ||
        item.arrayType === ObjectType.Number ||
        (item.type === ObjectType.String && itemOptions !== undefined)
      ) {
        const flatKey: string = item.flatKey || Math.random().toString();

        const error: boolean = _.get(errors, item.flatKey || "") || false,
          errorMessage: string = FormUtility.get.error.message(
            item,
            validation
          );

        return (
          <Select
            key={item.key}
            flatKey={flatKey}
            name={item.key}
            value={item.value}
            options={itemOptions.value || item.value}
            rawData={rawData}
            error={error}
            errorMessage={errorMessage}
            updateData={updateData}
          />
        );
      } else {
        return (
          <Section
            key={item.key}
            sectionKey={item.key}
            title={StringUtility.camelCaseToNormal(item.key)}
            data={item.value}
            validateOn={validateOn}
            onSubmit={_.get(submitHandlers, item.key)}
          >
            {FormUtility.map.data.to.components(
              rawData,
              item.children,
              options,
              types,
              validation,
              errors,
              submitHandlers,
              validateOn,
              updateData
            )}
          </Section>
        );
      }
    },
    mappedArray: (
      item: any[],
      rawData: any,
      options: any,
      types: any,
      validation: any,
      errors: any,
      submitHandlers: Function[],
      validateOn: Function,
      updateData: Function
    ) => {
      const arrayKey: number = parseInt(item[0].flatKey.replace(/^\D+/g, ""));
      return (
        <Section key={arrayKey} sectionKey={arrayKey.toString()}>
          {FormUtility.map.data.to.components(
            rawData,
            item,
            options,
            types,
            validation,
            errors,
            submitHandlers,
            validateOn,
            updateData
          )}
        </Section>
      );
    },
    alphaNumeric: (
      item: MappedDataItem,
      rawData: any,
      error: boolean,
      errorMessage: string,
      updateData: Function
    ) => {
      const flatKey: string = item.flatKey || Math.random().toString();
      return (
        <Text
          key={item.key}
          flatKey={flatKey}
          name={item.key}
          value={item.value}
          rawData={rawData}
          error={error}
          errorMessage={errorMessage}
          updateData={updateData}
        />
      );
    },
    boolean: (
      item: MappedDataItem,
      rawData: any,
      error: boolean,
      errorMessage: string,
      updateData: Function
    ) => {
      const flatKey: string = item.flatKey || Math.random().toString();
      return (
        <Checkbox
          key={item.key}
          flatKey={flatKey}
          name={item.key}
          value={item.value}
          rawData={rawData}
          error={error}
          errorMessage={errorMessage}
          updateData={updateData}
        />
      );
    },
    rlfComponent: (
      item: MappedDataItem,
      rlfComponentType: RLFComponentType,
      rawData: any,
      error: boolean,
      errorMessage: string,
      updateData: Function
    ): JSX.Element | null => {
      const flatKey: string = item.flatKey || Math.random().toString();

      if (rlfComponentType === RLFComponentType.Textarea) {
        return (
          <TextArea
            key={item.key}
            flatKey={flatKey}
            name={item.key}
            value={item.value}
            rawData={rawData}
            error={error}
            errorMessage={errorMessage}
            updateData={updateData}
          />
        );
      }

      return null;
    }
  },
  validate: {
    data: (
      rawData: any,
      mappedData: MappedDataItem[],
      validation: any,
      errors: any,
      updateErrors: Function
    ): any => {
      if (validation === undefined || validation === null) {
        return true;
      }

      let invalidCount: number = 0;

      mappedData.forEach((item: MappedDataItem | MappedDataItem[]) => {
        let items: MappedDataItem[] = Array.isArray(item) ? item : [],
          children: MappedDataItem[] = !Array.isArray(item)
            ? item.children || []
            : [];

        if (items.length > 0 || children.length > 0) {
          items = items.length > 0 ? items : children;
          const validated: boolean = FormUtility.validate.data(
            rawData,
            items,
            validation,
            errors,
            updateErrors
          );

          if (!validated) {
            invalidCount++;
          }
        } else if (!Array.isArray(item)) {
          const flatKey: string = FormUtility.format.flatKey.for.validation(
              item.flatKey
            ),
            validationFn: Function = _.get(validation, flatKey);

          if (validationFn !== undefined) {
            const validated: boolean = FormUtility.run.validation(
              validationFn,
              _.get(rawData, item.flatKey || "")
            );

            if (!validated) {
              invalidCount++;
            }

            _.set(errors, item.flatKey || "", !validated);

            updateErrors(errors);
          }
        }
      });

      return invalidCount === 0;
    }
  },
  format: {
    flatKey: {
      for: {
        validation: (key: string | undefined): string => {
          return key
            ? key
                .split(".")
                .filter((k: string) => isNaN(parseInt(k)))
                .join(".")
            : "";
        }
      }
    }
  },
  run: {
    validation: (fn: Function | RLFValidationType, value: any): boolean => {
      if (typeof fn === ObjectType.String) {
        if (fn === RLFValidationType.Required) {
          if (typeof value === ObjectType.Boolean) {
            return value === true;
          }

          return value !== undefined && value !== null && value.trim() !== "";
        } else {
          return true;
        }
      } else {
        return (fn as Function)(value);
      }
    }
  }
};
