import * as _ from "lodash";

export const getRand = (min: number, max: number): number => {
  return Math.floor(Math.random() * max) + min;
};

export const camelCaseToNormal = (value: string) =>
  value
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str: string) => str.toUpperCase());

export const camelCaseToKebab = (value: string) =>
  _.kebabCase(camelCaseToNormal(value));

export const kebabToCamelCase = (value: string) =>
  _.camelCase(value.replace(/-/g, " "));

export const kebabToNormal = (value: string) =>
  camelCaseToNormal(kebabToCamelCase(value));
