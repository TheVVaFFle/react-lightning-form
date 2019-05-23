import React from "react";
import { useState, useEffect } from "react";

import { Button } from "../enhanced/button";
import { Loading } from "../loading/loading";

import { FormUtility } from "../../utility";
import { MappedDataItem } from "../../utility/form";

export interface FormProps {
  id?: string;
  data?: any;
  options?: any;
  onSubmit: Function;
}

export const Form: React.SFC<FormProps> = (props: FormProps) => {
  const [rawData, setRawData] = useState<any>(null),
    [mappedData, setMappedData] = useState<MappedDataItem[]>(new Array());

  useEffect(() => {
    setRawData(props.data);
    setMappedData(FormUtility.map.raw.data(props.data));
  }, [props.data]);

  const handleOnSubmit = (): any => {
    props.onSubmit(rawData);
  };

  const getSubmitButton = (): JSX.Element | null => {
    if (props.onSubmit) {
      return <Button className="submit" handleOnClick={handleOnSubmit} />;
    }

    return null;
  };

  const components:
    | (JSX.Element | null)[]
    | null = FormUtility.map.data.to.components(
    rawData,
    mappedData,
    props.options,
    setRawData
  );

  return (
    <div id={props.id || undefined} className="form">
      {components}
      {getSubmitButton()}
    </div>
  );
};
