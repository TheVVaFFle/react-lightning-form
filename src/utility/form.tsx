import React from "react";
import * as _ from "lodash";

import { Section } from "../components/section/section";
import { Text } from "../components/enhanced/text";
import { Select } from "../components/enhanced/select";
import { Checkbox } from "../components/enhanced/checkbox";
import { TextArea } from "../components/enhanced/textarea";

import { StringUtility } from ".";

import { RLFComponentType } from "../components/form/form";

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
  rlfComponentType: RLFComponentType;
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
    }
  },
  map: {
    raw: {
      data: (data: any, parent: string = ""): any => {
        return Object.entries(data).map((entry: any) => {
          entry = {
            key: entry[0],
            value: entry[1],
            type: FormUtility.get.obj.type(entry[1]),
            flatKey: entry[0]
          };

          if (entry.value.rlfComponentType !== undefined) {
            const { value, rlfComponentType } = entry.value;
            entry = {
              ...entry,
              rlfComponentType,
              type: FormUtility.get.obj.type(value),
              value
            };
          } else {
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
          }

          return entry;
        });
      }
    },
    data: {
      to: {
        components: (
          rawData: any,
          mappedData: MappedDataItem[] | undefined,
          options: any,
          updateData: Function
        ): (JSX.Element | null)[] | null => {
          if (mappedData === undefined || mappedData === null) {
            return null;
          }

          return mappedData.map(
            (item: MappedDataItem): JSX.Element | null => {
              const itemOptions: any | undefined = Object.entries(options)
                .map((entry: any) => ({ key: entry[0], value: entry[1] }))
                .find((o: any) => o.key === item.key);

              if (item.rlfComponentType) {
                return FormUtility.handle.rlfComponent(
                  item,
                  rawData,
                  updateData
                );
              } else if (item.type === ObjectType.Object) {
                return FormUtility.handle.object(
                  item,
                  rawData,
                  options,
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
                  itemOptions,
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
      updateData: Function
    ) => {
      const title: string | undefined = isNaN(parseInt(item.key))
        ? StringUtility.camelCaseToNormal(item.key)
        : undefined;

      return (
        <Section key={item.key} title={title}>
          {FormUtility.map.data.to.components(
            rawData,
            item.children,
            options,
            updateData
          )}
        </Section>
      );
    },
    array: (
      item: MappedDataItem,
      rawData: any,
      options: any,
      itemOptions: any | undefined,
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
          >
            {FormUtility.map.data.to.components(
              rawData,
              item.children,
              options,
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
      updateData: Function
    ) => {
      const arrayKey: number = parseInt(item[0].flatKey.replace(/^\D+/g, ""));
      return (
        <Section key={arrayKey}>
          {FormUtility.map.data.to.components(
            rawData,
            item,
            options,
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
      rawData: any,
      updateData: Function
    ) => {
      const flatKey: string = item.flatKey || Math.random().toString();

      if (item.rlfComponentType === RLFComponentType.Textarea) {
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
  }
};
