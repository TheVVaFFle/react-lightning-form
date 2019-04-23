import * as React from "react";
import {useState, useEffect} from "react";

import {Form} from "../form/form";
import {Section} from "../section/section";

import { ValidationType } from "../../utility/validation";

import {Test} from "../../data";

require('./app.scss');

export interface AppProps {

}

export const App: React.SFC<AppProps> = (props: AppProps) => {  
  const [loading, setLoading] = useState(true);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }

  useEffect(() => {
    simulateLoading();
  }, [])

  const handleOnSubmit = (formState: any) => {
    console.log(formState)
    simulateLoading();
  }

  const validateComments = (value: string): boolean => {
    return value.length >= 20 && value.length <= 50;
  }

  return(
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
        />          
        <Section 
          title="Contact" 
          columns={2} 
          data={Test.data.contact}
        />
        <textarea 
          id="comments" 
          placeholder="Enter comments here"
          label="Comments"
          validate={validateComments}
          errormessage="Must be between 20 and 50 characters."
        />
      </Form>
    </div>
  )
}