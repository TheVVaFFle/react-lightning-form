import React from "react"
import classNames from "classnames"

import {Validate} from "./validation"

export const FormUtility = {  
  getTitle: (title: string | undefined): JSX.Element | null => {
    if(title !== undefined){
      return(
        <div className="title">
          <h1>{title}</h1>
        </div>
      )
    }

    return null;
  },
  getChildType: (child: JSX.Element): string => {
    return typeof child.type === "string"
    ? child.type
    : child.type(child.props).props.className
  },  
  formatState: (formState: any) => {
    let formattedFormState: any = {...formState};

    Object.entries(formState).map((entry: any) => {
      const key= entry[0],
            prop = entry[1];
      formattedFormState[key] = prop.value;
    })

    return formattedFormState;
  },
  input: {
    getClasses: (child: JSX.Element, formState: any): string => {    
      const classes: string = classNames(
        child.props.className, 
        {"error": formState[child.props.id] && formState[child.props.id].error}
      )
      
      return classes;
    },
    getStyles: (index: number, columns: number | undefined, alone?: boolean): React.CSSProperties => {
      columns = columns !== undefined && columns !== -1 ? columns : 1;
      const row: number = (index + 1) / columns,
            width: string = `calc(${100 / columns}% - ${((columns - 1) * 20) / columns}px)`,
            marginLeft: string = index % columns === 0 ? "0px" : "20px",
            marginTop: string = row > 1 || alone ? "20px" : "0px";
    
      return {width, marginLeft, marginTop}
    },
    getLabel: (child: JSX.Element): JSX.Element | null => {
      if(child.props.label){
        return(
          <h1 className="label">{child.props.label}</h1>
        )
      }
  
      return null;
    },  
    getErrorMessage: (child: JSX.Element, formState: any): JSX.Element | null => {    
      const error: boolean = formState[child.props.id] && formState[child.props.id].error,
            input: string = formState[child.props.id] ? formState[child.props.id].value : "",
            type: string = formState[child.props.id] ? formState[child.props.id].validate : "";
      
      if(error){
        return(
          <h1 className="error-message">{Validate.getErrorMessage(type, input)}</h1>
        )
      }
  
      return null;
    }
  }
}