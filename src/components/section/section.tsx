import React from "react"
import {useState, useEffect} from "react"
import classNames from "classnames"

import * as GeneralUtility from "../../utility"
import {Validate, ValidationType} from "../../utility/validation";

export interface SectionProps{
  title?: string;
  children?: any;
  data?: any;
  columns?: number;
}

export const Section: React.SFC<SectionProps> = (props: SectionProps) => {
  const getTitle = (): JSX.Element | null => {
    if(props.title !== undefined){
      return(
        <div className="title">
          <h1>{props.title}</h1>
        </div>
      )
    }

    return null;
  }
  const mapChildrenFromData = (data: any) => {
    return Object.entries(data).map((entry: any) => {
      const key: string = entry[0],
            value: string | number = entry[1];

      const formattedKey: string = GeneralUtility.camelCaseToNormal(key)

      return(
        <input
          id={GeneralUtility.camelCaseToKebab(key)}
          key={key}
          type="text"
          className="text-input"
          defaultValue={value.toString()}
          placeholder={`Enter ${formattedKey.toLowerCase()}`}
          label={formattedKey}
          validate={ValidationType.Required}
        />
      )
    })
  }
  const getChildren = (): JSX.Element[] | null => {
    if(props.children){
      return props.children;
    }

    return null;
  }
  
  return(
    <div className="section">
      {getTitle()}
      <div className="fields">
        {getChildren()}
      </div>
    </div>
  )
}