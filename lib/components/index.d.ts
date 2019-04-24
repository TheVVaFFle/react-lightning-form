import { Form, FormComponentType } from "./form/form";
import { Section } from "./section/section";
import { ValidationType } from "../utility/validation";
declare module "react" {
  interface HTMLAttributes<T> {
    validate?: ValidationType | Function;
    label?: string;
    type?: string;
    errormessage?: string;
  }
}
export { Form, FormComponentType, Section, ValidationType };
