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
  const handleSubmitForm = (data: any) => {
    console.log(data);
  };

  const handleSubmitName = (data: any) => {
    console.log(data);
  };

  const handleSubmitAbout = (data: any) => {
    console.log(data);
  };

  const handleSubmitFamily = (data: any) => {
    console.log(data);
  };

  const handleSubmitLocation = (data: any) => {
    console.log(data);
  };

  return (
    <div id="app">
      {/* <Form
        title="User Profile by Form"
        data={Test.data}
        options={Test.options}
        types={Test.types}
        validation={Test.validation}
        onSubmit={handleSubmitForm}
      /> */}
      <Form
        title="User Profile by Section"
        options={Test.options}
        types={Test.types}
        validation={Test.validation}
        onSubmit={handleSubmitForm}
      >
        <Section data={{ name: Test.data.name }} onSubmit={handleSubmitName} />
        <Section
          data={{ about: Test.data.about }}
          onSubmit={handleSubmitAbout}
        />
        <Section
          data={{ family: Test.data.family }}
          onSubmit={handleSubmitFamily}
        />
        <Section
          data={{ location: Test.data.location }}
          onSubmit={handleSubmitLocation}
        />
        <Section data={{ comments: Test.data.comments }} />
      </Form>
    </div>
  );
};
