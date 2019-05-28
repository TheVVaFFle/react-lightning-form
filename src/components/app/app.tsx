import * as React from "react";
import { useState, useEffect } from "react";

import { Form } from "../form/form";
import { Section } from "../section/section";

import { Test } from "../../data";

require("./app.scss");

declare module "react" {
  interface HTMLAttributes<T> {}
}

export interface AppProps {}

export const App: React.SFC<AppProps> = (props: AppProps) => {
  return (
    <div id="app">
      <Form
        title="User Profile by Section"
        options={Test.options}
        types={Test.types}
        validation={Test.validation}
        submit={Test.submit}
      >
        <Section data={{ name: Test.data.name }} />
        <Section data={{ about: Test.data.about }} />
        <Section data={{ family: Test.data.family }} />
        <Section data={{ location: Test.data.location }} />
        <Section data={{ comments: Test.data.comments }} />
      </Form>
    </div>
  );
};
