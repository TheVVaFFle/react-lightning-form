import * as React from "react";
import {useState, useEffect} from "react";

import {Form} from "../form/form";
import {Section} from "../section/section";

import {ValidationType} from "../../utility/validation";

require('./app.scss');

export interface AppProps {

}

export const App: React.SFC<AppProps> = (props: AppProps) => {  
  const [loading, setLoading] = useState(true);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }

  useEffect(() => {
    simulateLoading();
  }, [])

  const handleOnSubmit = (formState: any) => {
    console.log(formState)
    simulateLoading();
  }

  return(
    <div id="app">
      <Form 
        id="app-form"
        title="My Application"
        columns={1}
        loading={loading}
        onSubmit={handleOnSubmit}
      >
        <Section title="Name" columns={3}>
          <input 
            id="first-name"
            type="text"
            className="text-input"
            defaultValue="Billy"
            placeholder="Enter first name"
            label="First Name"
            validate={ValidationType.Required}
          />
          <input 
            id="middle-name"
            type="text"
            className="text-input"
            placeholder="Enter middle name"
            label="Middle Name"
            defaultValue="Bob"
          />
          <input 
            id="last-name"
            type="text"
            className="text-input"
            defaultValue="Smith"
            placeholder="Enter last name"
            label="Last Name"
            validate={ValidationType.Required}
          />
        </Section>
        <Section title="Contact" columns={2}>
          <input 
            id="phone-number"
            type="text"
            className="text-input"
            defaultValue="(314) 780-5555"
            placeholder="(123) 456-7890"
            label="Phone Number"
            validate={ValidationType.Phone}
          />
          <input 
            id="email-address"
            type="text"
            className="text-input"
            defaultValue="my-email@gmail.com"
            placeholder="my-email@gmail.com"
            label="Email Address"
            validate={ValidationType.Email}
          />
        </Section>
        <input 
          id="comments"
          type="text"
          className="text-input"          
          placeholder="Enter comments"
          label="Comments"
        />
        <input 
          id="addtl-comments"
          type="text"
          className="text-input"          
          placeholder="Enter addt'l comments"
          label="Addt'l Comments"
        />
      </Form>
    </div>
  )
}