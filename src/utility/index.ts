import { FormUtility } from "./form";
import { StringUtility } from "./string";
import { ValidationUtility } from "./validation";

export const getRand = (min: number, max: number): number => {
  return Math.floor(Math.random() * max) + min;
};

export { FormUtility, StringUtility, ValidationUtility };
