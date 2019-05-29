import React from "react";
import * as _ from "lodash";

import { RLFSection } from "../components/section/section";
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
  Object = "object",
  Function = "function"
}

export interface MappedDataItem {
  key: string;
  flatKey?: string;
  type: ObjectType;
  arrayType: ObjectType;
  value: any;
  children?: MappedDataItem[];
}

export const RLFUtility = {
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
    title: (
      key: string | undefined,
      formattedKey: string,
      labels: any
    ): string | undefined => {
      const potential: any = _.get(labels, formattedKey);

      if (potential && potential.this !== undefined) {
        return potential.this;
      }

      return key;
    },
    error: {
      message: (
        item: MappedDataItem,
        validation: any,
        messages: any
      ): string => {
        const flatKey: string = RLFUtility.format.flatKey(item.flatKey),
          validationType: RLFValidationType | Function | null =
            _.get(validation, flatKey) || null;

        if (validationType === RLFValidationType.Required) {
          const field: string = StringUtility.camelCaseToNormal(item.key);
          if (item.type === ObjectType.Boolean) {
            return `${field} must be selected.`;
          }

          return `${field} is a required field.`;
        } else if (typeof validationType === ObjectType.Function) {
          const message: string = _.get(messages, item.flatKey || "");
          if (message) {
            return message;
          }
        }

        return "Error. Please enter a valid value.";
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
      const mappedTree: MappedDataItem[] | null = RLFUtility.map.raw.data(tree);

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
      const type: RLFComponentType = _.get(
        types,
        RLFUtility.format.flatKey(item.flatKey) || ""
      );

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
            type: RLFUtility.get.obj.type(entry[1]),
            flatKey: entry[0]
          };

          if (parent) {
            entry = { ...entry, flatKey: `${parent}.${entry.flatKey}` };
          }

          if (entry.type === ObjectType.Object) {
            entry = {
              ...entry,
              children: RLFUtility.map.raw.data(entry.value, entry.key)
            };
          } else if (entry.type === ObjectType.Array) {
            if (typeof entry.value[0] === ObjectType.Object) {
              const children: MappedDataItem[] = entry.value.map(
                (v: MappedDataItem, i: number) =>
                  RLFUtility.map.raw.data(v, `${entry.flatKey}.${i}`)
              );

              entry.children = children;
            }

            entry = {
              ...entry,
              arrayType: RLFUtility.get.obj.type(entry.value[0])
            };
          }

          return entry;
        });
      }
    },
    section: {
      data: (children: any) => {
        let data: any = {},
          loading: any = {},
          id: any = {},
          className: any = {};

        React.Children.map(children, (child: any) => {
          const key: string = Object.keys(child.props.data)[0];

          data = { ...data, ...child.props.data };

          _.set(loading, key, child.props.loading || false);
          _.set(id, key, child.props.id);
          _.set(className, key, child.props.className);
        });

        return {
          data,
          loading,
          id,
          className
        };
      }
    },
    data: {
      to: {
        components: (
          rawData: any,
          mappedData: MappedDataItem[] | undefined,
          labels: any,
          options: any,
          types: any,
          validation: any,
          submit: any,
          id: any,
          className: any,
          loading: any,
          errors: any,
          messages: any,
          updateData: Function,
          onSubmit: Function
        ): (JSX.Element | null)[] | null => {
          if (mappedData === undefined || mappedData === null) {
            return null;
          }

          return mappedData.map(
            (item: MappedDataItem): JSX.Element | null => {
              const itemOptions: any | undefined = options
                ? _.get(options, RLFUtility.format.flatKey(item.flatKey) || "")
                : undefined;

              const rlfComponentType: RLFComponentType | null = RLFUtility.get.rlfComponentType(
                item,
                types
              );
              console.log(item.flatKey, item.type, rlfComponentType);
              const error: boolean = _.get(errors, item.flatKey || "") || false,
                errorMessage: string = RLFUtility.get.error.message(
                  item,
                  validation,
                  messages
                );

              if (
                rlfComponentType &&
                typeof rlfComponentType === ObjectType.String
              ) {
                return RLFUtility.handle.rlfComponent(
                  item,
                  rlfComponentType,
                  rawData,
                  labels,
                  error,
                  errorMessage,
                  updateData
                );
              } else if (item.type === ObjectType.Object) {
                return RLFUtility.handle.object(
                  item,
                  rawData,
                  labels,
                  options,
                  types,
                  validation,
                  submit,
                  id,
                  className,
                  loading,
                  errors,
                  messages,
                  updateData,
                  onSubmit
                );
              } else if (
                item.type === ObjectType.Array ||
                itemOptions !== undefined
              ) {
                return RLFUtility.handle.array(
                  item,
                  rawData,
                  labels,
                  options,
                  types,
                  itemOptions,
                  validation,
                  submit,
                  id,
                  className,
                  loading,
                  errors,
                  messages,
                  updateData,
                  onSubmit
                );
              } else if (
                item.type === ObjectType.String ||
                item.type === ObjectType.Number
              ) {
                return RLFUtility.handle.alphaNumeric(
                  item,
                  rawData,
                  labels,
                  error,
                  errorMessage,
                  updateData
                );
              } else if (item.type === ObjectType.Boolean) {
                return RLFUtility.handle.boolean(
                  item,
                  rawData,
                  labels,
                  error,
                  errorMessage,
                  updateData
                );
              } else if (Array.isArray(item)) {
                return RLFUtility.handle.mappedArray(
                  item,
                  rawData,
                  labels,
                  options,
                  types,
                  validation,
                  submit,
                  id,
                  className,
                  loading,
                  errors,
                  messages,
                  updateData,
                  onSubmit
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
      labels: any,
      options: any,
      types: any,
      validation: any,
      submit: any,
      id: any,
      className: any,
      loading: any,
      errors: any,
      messages: any,
      updateData: Function,
      onSubmit: Function
    ) => {
      const key: string | undefined = isNaN(parseInt(item.key))
        ? StringUtility.camelCaseToNormal(item.key)
        : undefined;

      const formattedFlatKey: string =
          RLFUtility.format.flatKey(item.flatKey) || "",
        title: string | undefined = RLFUtility.get.title(
          key,
          formattedFlatKey,
          labels
        ),
        sectionLoading: boolean = _.get(loading, formattedFlatKey) || false;

      id = _.get(id, formattedFlatKey);
      className = _.get(className, formattedFlatKey);

      return (
        <RLFSection
          key={item.key}
          sectionKey={item.key}
          id={id}
          className={className}
          title={title}
          data={item.value}
          loading={sectionLoading}
          submit={submit}
          onSubmit={onSubmit}
        >
          {RLFUtility.map.data.to.components(
            rawData,
            item.children,
            labels,
            options,
            types,
            validation,
            submit,
            id,
            className,
            loading,
            errors,
            messages,
            updateData,
            onSubmit
          )}
        </RLFSection>
      );
    },
    array: (
      item: MappedDataItem,
      rawData: any,
      labels: any,
      options: any,
      types: any,
      itemOptions: any | undefined,
      validation: any,
      submit: any,
      id: any,
      className: any,
      loading: any,
      errors: any,
      messages: any,
      updateData: Function,
      onSubmit: Function
    ) => {
      if (
        item.arrayType === ObjectType.String ||
        item.arrayType === ObjectType.Number ||
        (item.type === ObjectType.String && itemOptions !== undefined)
      ) {
        const flatKey: string = item.flatKey || Math.random().toString(),
          formattedFlatKey: string =
            RLFUtility.format.flatKey(item.flatKey) || "",
          label: string = _.get(labels, formattedFlatKey) || null,
          error: boolean = _.get(errors, formattedFlatKey) || false,
          errorMessage: string = RLFUtility.get.error.message(
            item,
            validation,
            messages
          );

        itemOptions = itemOptions || item.value;

        return (
          <Select
            key={item.key}
            flatKey={flatKey}
            name={item.key}
            label={label}
            value={item.value}
            options={itemOptions}
            rawData={rawData}
            error={error}
            errorMessage={errorMessage}
            updateData={updateData}
          />
        );
      } else {
        const key: string | undefined = isNaN(parseInt(item.key))
          ? StringUtility.camelCaseToNormal(item.key)
          : undefined;

        const formattedFlatKey: string =
            RLFUtility.format.flatKey(item.flatKey) || "",
          title: string | undefined = RLFUtility.get.title(
            key,
            formattedFlatKey,
            labels
          ),
          sectionLoading: boolean = _.get(loading, formattedFlatKey) || false;

        id = _.get(id, formattedFlatKey);
        className = _.get(className, formattedFlatKey);

        return (
          <RLFSection
            key={item.key}
            sectionKey={item.key}
            id={id}
            className={className}
            title={title}
            data={item.value}
            loading={sectionLoading}
            submit={submit}
            onSubmit={onSubmit}
          >
            {RLFUtility.map.data.to.components(
              rawData,
              item.children,
              labels,
              options,
              types,
              validation,
              submit,
              id,
              className,
              loading,
              errors,
              messages,
              updateData,
              onSubmit
            )}
          </RLFSection>
        );
      }
    },
    mappedArray: (
      item: any[],
      rawData: any,
      labels: any,
      options: any,
      types: any,
      validation: any,
      submit: any,
      id: any,
      className: any,
      loading: any,
      errors: any,
      messages: any,
      updateData: Function,
      onSubmit: Function
    ) => {
      const arrayKey: number = parseInt(item[0].flatKey.replace(/^\D+/g, ""));
      return (
        <RLFSection key={arrayKey} sectionKey={arrayKey.toString()}>
          {RLFUtility.map.data.to.components(
            rawData,
            item,
            labels,
            options,
            types,
            validation,
            submit,
            id,
            className,
            loading,
            errors,
            messages,
            updateData,
            onSubmit
          )}
        </RLFSection>
      );
    },
    alphaNumeric: (
      item: MappedDataItem,
      rawData: any,
      labels: any,
      error: boolean,
      errorMessage: string,
      updateData: Function
    ) => {
      const flatKey: string = item.flatKey || Math.random().toString(),
        formattedFlatKey: string =
          RLFUtility.format.flatKey(item.flatKey) || "",
        label: string = _.get(labels, formattedFlatKey) || null;
      return (
        <Text
          key={item.key}
          flatKey={flatKey}
          name={item.key}
          label={label}
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
      labels: any,
      error: boolean,
      errorMessage: string,
      updateData: Function
    ) => {
      const flatKey: string = item.flatKey || Math.random().toString(),
        formattedFlatKey: string =
          RLFUtility.format.flatKey(item.flatKey) || "",
        label: string = _.get(labels, formattedFlatKey) || null;

      return (
        <Checkbox
          key={item.key}
          flatKey={flatKey}
          name={item.key}
          label={label}
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
      labels: any,
      error: boolean,
      errorMessage: string,
      updateData: Function
    ): JSX.Element | null => {
      const flatKey: string = item.flatKey || Math.random().toString(),
        formattedFlatKey: string =
          RLFUtility.format.flatKey(item.flatKey) || "",
        label: string = _.get(labels, formattedFlatKey) || null;

      if (rlfComponentType === RLFComponentType.Textarea) {
        return (
          <TextArea
            key={item.key}
            flatKey={flatKey}
            name={item.key}
            label={label}
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
          const validated: boolean = RLFUtility.validate.data(
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
          const flatKey: string = RLFUtility.format.flatKey(item.flatKey),
            validationFn: Function = _.get(validation, flatKey);

          if (validationFn !== undefined) {
            const validated: boolean = RLFUtility.run.validation(
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
    flatKey: (key: string | undefined): string => {
      return key
        ? key
            .split(".")
            .filter((k: string) => isNaN(parseInt(k)))
            .join(".")
        : "";
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
