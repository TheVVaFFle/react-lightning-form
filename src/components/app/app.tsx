import * as React from "react";
import { useState, useEffect } from "react";

import { RLF } from "../form/form";
import { RLFSection } from "../section/section";

import { Test } from "../../data";

require("./app.scss");

export interface AppProps {}

export const App: React.SFC<AppProps> = (props: AppProps) => {
  return (
    <div id="app">
      <RLF
        title="User Profile by Section"
        options={Test.options}
        types={Test.types}
        validation={Test.validation}
        messages={Test.messages}
        submit={Test.submit}
      >
        <RLFSection data={{ name: Test.data.name }} />
        <RLFSection data={{ about: Test.data.about }} />
        <RLFSection data={{ family: Test.data.family }} />
        <RLFSection data={{ location: Test.data.location }} />
        <RLFSection data={{ comments: Test.data.comments }} />
      </RLF>
    </div>
  );
};
