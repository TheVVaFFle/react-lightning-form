/// <reference types="react" />
import { Form } from "./form/form";
import { Section } from "./section/section";
import { ValidationType } from "../utility/validation";
declare module 'react' {
    interface HTMLAttributes<T> extends DOMAttributes<T> {
        validate?: ValidationType | Function;
        label?: string;
        type?: string;
        errormessage?: string;
    }
}
export { Form, Section };
