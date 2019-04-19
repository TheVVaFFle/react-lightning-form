import React from "react"
import {useState, useEffect} from "react"
import classNames from "classnames"

import {Validate} from "../../utility/validation";

export interface SectionProps{
  title?: string;
  children: any;
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
  
  return(
    <div className="section">
      {getTitle()}
      <div className="fields">
        {props.children}
      </div>
    </div>
  )
}