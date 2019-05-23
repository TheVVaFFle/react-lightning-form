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
      data: (data: any, parent: string = ""): any => {
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
          errors: any,
          submitHandlers: Function[],
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

              if (rlfComponentType) {
                return FormUtility.handle.rlfComponent(
                  item,
                  rlfComponentType,
                  rawData,
                  updateData
                );
              } else if (item.type === ObjectType.Object) {
                return FormUtility.handle.object(
                  item,
                  rawData,
                  options,
                  types,
                  errors,
                  submitHandlers,
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
                  errors,
                  submitHandlers,
                  updateData
                );
              } else if (
                item.type === ObjectType.String ||
                item.type === ObjectType.Number
              ) {
                return FormUtility.handle.alphaNumeric(
                  item,
                  rawData,
                  updateData
                );
              } else if (item.type === ObjectType.Boolean) {
                return FormUtility.handle.boolean(item, rawData, updateData);
              } else if (Array.isArray(item)) {
                return FormUtility.handle.mappedArray(
                  item,
                  rawData,
                  options,
                  types,
                  errors,
                  submitHandlers,
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
      errors: any,
      submitHandlers: Function[],
      updateData: Function
    ) => {
      const title: string | undefined = isNaN(parseInt(item.key))
        ? StringUtility.camelCaseToNormal(item.key)
        : undefined;

      return (
        <Section
          key={item.key}
          title={title}
          data={item.value}
          onSubmit={_.get(submitHandlers, item.key)}
        >
          {FormUtility.map.data.to.components(
            rawData,
            item.children,
            options,
            types,
            errors,
            submitHandlers,
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
      errors: any,
      submitHandlers: Function[],
      updateData: Function
    ) => {
      if (
        item.arrayType === ObjectType.String ||
        item.arrayType === ObjectType.Number ||
        (item.type === ObjectType.String && itemOptions !== undefined)
      ) {
        const flatKey: string = item.flatKey || Math.random().toString();

        return (
          <Select
            key={item.key}
            flatKey={flatKey}
            name={item.key}
            value={item.value}
            options={itemOptions.value || item.value}
            rawData={rawData}
            updateData={updateData}
          />
        );
      } else {
        return (
          <Section
            key={item.key}
            title={StringUtility.camelCaseToNormal(item.key)}
            data={item.value}
            onSubmit={_.get(submitHandlers, item.key)}
          >
            {FormUtility.map.data.to.components(
              rawData,
              item.children,
              options,
              types,
              errors,
              submitHandlers,
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
      errors: any,
      submitHandlers: Function[],
      updateData: Function
    ) => {
      const arrayKey: number = parseInt(item[0].flatKey.replace(/^\D+/g, ""));
      return (
        <Section key={arrayKey}>
          {FormUtility.map.data.to.components(
            rawData,
            item,
            options,
            types,
            errors,
            submitHandlers,
            updateData
          )}
        </Section>
      );
    },
    alphaNumeric: (
      item: MappedDataItem,
      rawData: any,
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
          updateData={updateData}
        />
      );
    },
    boolean: (item: MappedDataItem, rawData: any, updateData: Function) => {
      const flatKey: string = item.flatKey || Math.random().toString();
      return (
        <Checkbox
          key={item.key}
          flatKey={flatKey}
          name={item.key}
          value={item.value}
          rawData={rawData}
          updateData={updateData}
        />
      );
    },
    rlfComponent: (
      item: MappedDataItem,
      rlfComponentType: RLFComponentType,
      rawData: any,
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

      mappedData.forEach((item: MappedDataItem) => {
        if (item.children) {
          const validated: boolean = FormUtility.validate.data(
            rawData,
            item.children,
            validation,
            errors,
            updateErrors
          );

          if (!validated) {
            invalidCount++;
          }
        } else {
          const validationFn: Function = _.get(validation, item.flatKey || "");

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
  run: {
    validation: (fn: Function | RLFValidationType, value: any): boolean => {
      if (typeof fn === ObjectType.String) {
        if (fn === RLFValidationType.Required) {
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
