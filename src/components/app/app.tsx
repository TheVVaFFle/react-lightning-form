import * as React from "react";
import { useState, useEffect } from "react";

import { RLF } from "../form/form";
import { RLFSection } from "../section/section";

import { Test } from "../../data";

require("./app.scss");

export interface AppProps {}

export const App: React.SFC<AppProps> = (props: AppProps) => {
  const [loading, setLoading] = useState(false),
    [loadingName, setLoadingName] = useState(false),
    [loadingAbout, setLoadingAbout] = useState(false);

  const handleSubmitForm = (data: any) => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
    console.log(data);
  };

  const handleSubmitName = (data: any) => {
    setLoadingName(true);
    setTimeout(() => setLoadingName(false), 1000);
    console.log(data);
  };

  const handleSubmitAbout = (data: any) => {
    setLoadingAbout(true);
    setTimeout(() => setLoadingAbout(false), 1000);
    console.log(data);
  };

  const handleSubmitFamily = (data: any) => {
    console.log(data);
  };

  const handleSubmitLocation = (data: any) => {
    console.log(data);
  };

  const submit: any = {
    form: handleSubmitForm,
    name: handleSubmitName,
    about: handleSubmitAbout,
    family: handleSubmitFamily,
    location: handleSubmitLocation
  };

  return (
    <div id="app">
      <RLF
        title="User Profile by Section"
        options={Test.options}
        types={Test.types}
        validation={Test.validation}
        messages={Test.messages}
        loading={loading}
        submit={submit}
      >
        <RLFSection data={{ name: Test.data.name }} loading={loadingName} />
        <RLFSection data={{ about: Test.data.about }} loading={loadingAbout} />
        <RLFSection data={{ family: Test.data.family }} />
        <RLFSection data={{ location: Test.data.location }} />
        <RLFSection data={{ comments: Test.data.comments }} />
      </RLF>
    </div>
  );
};
