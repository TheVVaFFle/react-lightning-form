import * as React from "react";
import { useState, useEffect } from "react";
import * as _ from "lodash";

import { RLF } from "../form/form";
import { RLFSection } from "../section/section";

import { Test } from "../../data";

require("./app.scss");

export interface AppProps {}

export const App: React.SFC<AppProps> = (props: AppProps) => {
  const [data, setData] = useState<any>({}),
    [loading, setLoading] = useState(true),
    [loadingName, setLoadingName] = useState(false),
    [loadingAbout, setLoadingAbout] = useState(false);

  const [nicknames, setNicknames] = useState<any[]>(new Array());

  setTimeout(() => {
    setData(Test.data);
    setLoading(false);
  }, 1000);

  const name: any = { ...data.name },
    options: any = { ...Test.options };

  if (nicknames && nicknames.length > 0) {
    _.set(name, "nicknames", nicknames);
  }

  const handleSubmitForm = (data: any) => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
    console.log(data);
  };

  const handleSubmitName = (data: any) => {
    console.log(data);
    setLoadingName(true);
    setTimeout(() => {
      setLoadingName(false);
      setNicknames(Test.results.nicknames);
    }, 1000);
  };

  const handleSubmitAbout = (data: any) => {
    console.log(data);
    setLoadingAbout(true);
    setTimeout(() => setLoadingAbout(false), 1000);
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

  const handleFirstName = (value: any) => {
    console.log(value);
  };

  const handleSuffix = (value: any) => {
    console.log(value);
  };

  const handleComments = (value: any) => {
    console.log(value);
  };

  const onChange: any = {
    name: {
      firstName: handleFirstName,
      suffix: handleSuffix
    },
    comments: handleComments
  };

  return (
    <div id="app">
      <RLF
        title="User Profile"
        labels={Test.labels}
        options={options}
        types={Test.types}
        validation={Test.validation}
        messages={Test.messages}
        onChange={onChange}
        loading={loading}
        submit={submit}
      >
        <RLFSection data={{ name }} loading={loadingName} />
        <RLFSection data={{ about: data.about }} loading={loadingAbout} />
        <RLFSection data={{ family: data.family }} />
        <RLFSection data={{ location: data.location }} />
        <RLFSection data={{ comments: data.comments }} />
      </RLF>
    </div>
  );
};
