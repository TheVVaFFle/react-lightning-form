import * as _ from "lodash";

export const StringUtility = {
  camelCaseToNormal: (value: string) =>
    value
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str: string) => str.toUpperCase()),

  camelCaseToKebab: (value: string) =>
    _.kebabCase(StringUtility.camelCaseToNormal(value)),

  kebabToCamelCase: (value: string) => _.camelCase(value.replace(/-/g, " ")),

  kebabToNormal: (value: string) =>
    StringUtility.camelCaseToNormal(StringUtility.kebabToCamelCase(value))
};
