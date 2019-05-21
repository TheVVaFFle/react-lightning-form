import * as React from "react";
import { useState, useEffect } from "react";

import { Form, ValidationType } from "../";
import { Section } from "../";
import { Table } from "../";

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
  const [loading, setLoading] = useState(true);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleOnSubmit = (result: any) => {
    simulateLoading();
    console.log(result);
  };

  useEffect(() => {
    simulateLoading();
  }, []);

  return (
    <div id="app">
      <Form id="name-form" title="My Form">
        <Section outline>
          <Section title="Name" sm={1} md={2} lg={4} data={Test.data.name} />
        </Section>
      </Form>
      <Form id="contact-form" loading={loading} onSubmit={handleOnSubmit}>
        <Section lg={3} outline>
          <Section title="Contact" data={Test.data.contact} />
          <Section title="About" data={Test.data.about} />
        </Section>
        <Section title="Vehicle" outline>
          <Table
            id="vehicles"
            defaultHeaders={Test.data.searchResults.headers}
            data={Test.data.searchResults.data}
            selectable
          />
        </Section>
      </Form>
    </div>
  );
};
