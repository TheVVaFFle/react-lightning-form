import * as React from "react"
import * as ReactDOM from "react-dom"

import {App} from "./components/app/app"

import { ValidationType } from "./utility/validation";

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    validate?: ValidationType | Function;
    label?: string;
    type?: string;
    errormessage?: string;
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById("root")
)