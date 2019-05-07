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
    [loadingName, setLoadingName] = useState(false),
    [loadingContact, setLoadingContact] = useState(false);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const simulateLoadingName = () => {
    setLoadingName(true);
    setTimeout(() => setLoadingName(false), 1000);
  };

  const simulateLoadingContact = () => {
    setLoadingContact(true);
    setTimeout(() => setLoadingContact(false), 1000);
  };

  useEffect(() => {
    simulateLoading();
  }, []);

  const handleSubmitName = (formState: any) => {
    console.log(formState);
    simulateLoadingName();
  };

  const handleSubmitContact = (formState: any) => {
    console.log(formState);
    simulateLoadingContact();
  };

  return (
    <div id="app">
      <Form
        id="name-form"
        title="My Form"
        submitLabel="Update Name"
        loading={loadingName}
        onSubmit={handleSubmitName}
      >
        <Section title="Name" sm={1} md={2} lg={4} data={Test.data.name} />
      </Form>
      <Form
        id="contact-form"
        submitLabel="Submit Contact Info"
        loading={loadingContact}
        onSubmit={handleSubmitContact}
      >
        <Section title="Contact">
          <Section lg={3} data={Test.data.contact} />
          <Section>
            <input
              id="favorite-color-red"
              type="radio"
              name="favorite-color"
              value="Red"
            />
            <input
              id="favorite-color-green"
              type="radio"
              name="favorite-color"
              value="Green"
            />
            <input
              id="favorite-color-blue"
              type="radio"
              name="favorite-color"
              value="Blue"
            />
          </Section>
        </Section>
        <textarea
          id="comments"
          label="Comments"
          placeholder="Enter comments"
          validate={Test.data.comments.validate}
          errormessage={Test.data.comments.errormessage}
        />
      </Form>
    </div>
  );
};
