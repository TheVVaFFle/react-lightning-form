import React from "react";
import * as _ from "lodash";

import { Section } from "../components/section/section";
import { Text } from "../components/enhanced/text";
import { Select } from "../components/enhanced/select";
import { Checkbox } from "../components/enhanced/checkbox";

import { StringUtility } from ".";

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

              if (item.type === ObjectType.Object) {
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
              } else if (
                item.type === ObjectType.Array ||
                itemOptions !== undefined
              ) {
                if (
                  item.arrayType === ObjectType.String ||
                  item.arrayType === ObjectType.Number ||
                  (item.type === ObjectType.String && itemOptions !== undefined)
                ) {
                  const flatKey: string =
                    item.flatKey || Math.random().toString();
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
              } else if (
                item.type === ObjectType.String ||
                item.type === ObjectType.Number
              ) {
                const flatKey: string =
                  item.flatKey || Math.random().toString();
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
              } else if (item.type === ObjectType.Boolean) {
                const flatKey: string =
                  item.flatKey || Math.random().toString();
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
              } else if (Array.isArray(item)) {
                const arrayKey: number = parseInt(
                  item[0].flatKey.replace(/^\D+/g, "")
                );
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
              } else {
                return <div key={item.key} />;
              }
            }
          );
        }
      }
    }
  }
};
