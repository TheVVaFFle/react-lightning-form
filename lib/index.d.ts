/// <reference types="react" />
import { ValidationType } from "./utility/validation";
declare module 'react' {
    interface HTMLAttributes<T> extends DOMAttributes<T> {
        validate?: ValidationType | Function;
        label?: string;
        type?: string;
        errormessage?: string;
    }
}
