import * as React from "react";
import { useState, useEffect } from "react";

import { Form, ValidationType } from "../";
import { Section } from "../";

import { Test } from "../../data";

require("./app.scss");

declare module "react" {
  interface HTMLAttributes<T> {
    validate?: ValidationType | Function;
    label?: string;
    type?: string;
    errormessage?: string;
  }
}

export interface AppProps {}

export const App: React.SFC<AppProps> = (props: AppProps) => {
  const [loading, setLoading] = useState(true),
    [loadingName, setLoadingName] = useState(false);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const simulateLoadingName = () => {
    setLoadingName(true);
    setTimeout(() => setLoadingName(false), 1000);
  };

  useEffect(() => {
    simulateLoading();
  }, []);

  const handleOnSubmit = (formState: any) => {
    console.log(formState);
    simulateLoading();
  };

  const handleSubmitName = (formState: any) => {
    console.log(formState);
    simulateLoadingName();
  };

  return (
    <div id="app">
      <Form
        id="app-form"
        title="My Form"
        loading={loading}
        onSubmit={handleOnSubmit}
      >
        <Section
          title="Name"
          columns={4}
          data={Test.data.name}
          loading={loadingName}
          onSubmit={handleSubmitName}
        />
        <Section title="Contact" columns={2}>
          <Section columns={3} data={Test.data.contact.section1} />
          <Section columns={1} data={Test.data.contact.section2} />
          <button type="button" className="submit-button">
            Hello
          </button>
        </Section>
      </Form>
    </div>
  );
};
