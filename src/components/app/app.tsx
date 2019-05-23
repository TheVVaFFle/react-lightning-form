import * as React from "react";
import { useState, useEffect } from "react";

import { Form } from "../form/form";

import { Test } from "../../data";

require("./app.scss");

declare module "react" {
  interface HTMLAttributes<T> {}
}

export interface AppProps {}

export const App: React.SFC<AppProps> = (props: AppProps) => {
  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div id="app">
      <Form data={Test.data} options={Test.options} onSubmit={handleSubmit} />
    </div>
  );
};
