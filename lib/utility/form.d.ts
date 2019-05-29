/// <reference types="react" />
import { RLFComponentType, RLFValidationType } from "../components/form/form";
export declare enum ObjectType {
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
export declare const RLFUtility: {
  get: {
    obj: {
      type: (obj: any) => string;
    };
    title: (
      key: string | undefined,
      formattedKey: string,
      labels: any
    ) => string | undefined;
    error: {
      message: (item: MappedDataItem, validation: any, messages: any) => string;
      positions: (errors: any) => any[];
    };
    errors: (tree: any) => any[];
    rlfComponentType: (
      item: MappedDataItem,
      types: any
    ) => RLFComponentType | null;
  };
  map: {
    raw: {
      data: (data: any, parent?: string) => MappedDataItem[] | null;
    };
    section: {
      data: (
        children: any
      ) => {
        data: any;
        loading: any;
        id: any;
        className: any;
      };
    };
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
        ) => (JSX.Element | null)[] | null;
      };
    };
  };
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
    ) => JSX.Element;
    array: (
      item: MappedDataItem,
      rawData: any,
      labels: any,
      options: any,
      types: any,
      itemOptions: any,
      validation: any,
      submit: any,
      id: any,
      className: any,
      loading: any,
      errors: any,
      messages: any,
      updateData: Function,
      onSubmit: Function
    ) => JSX.Element;
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
    ) => JSX.Element;
    alphaNumeric: (
      item: MappedDataItem,
      rawData: any,
      labels: any,
      error: boolean,
      errorMessage: string,
      updateData: Function
    ) => JSX.Element;
    boolean: (
      item: MappedDataItem,
      rawData: any,
      labels: any,
      error: boolean,
      errorMessage: string,
      updateData: Function
    ) => JSX.Element;
    rlfComponent: (
      item: MappedDataItem,
      rlfComponentType: RLFComponentType,
      rawData: any,
      labels: any,
      error: boolean,
      errorMessage: string,
      updateData: Function
    ) => JSX.Element | null;
  };
  validate: {
    data: (
      rawData: any,
      mappedData: MappedDataItem[],
      validation: any,
      errors: any,
      updateErrors: Function
    ) => any;
  };
  format: {
    flatKey: (key: string | undefined) => string;
  };
  run: {
    validation: (fn: Function | RLFValidationType, value: any) => boolean;
  };
};
