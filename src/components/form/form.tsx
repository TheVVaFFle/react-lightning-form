import React from "react";
import {useState, useEffect} from "react";
import classNames from "classnames";

import {Loading} from "../loading/loading";

import {Validate} from "../../utility/validation";
import {FormUtility} from "../../utility/form";

export enum FormComponentType {
  Input = "input",
  Section = "section"
}

export interface FormProps{
  id?: string;
  title?: string;
  children: any;
  columns?: number;
  loading: boolean;
  onSubmit: (formState: any) => void;
}

export const Form: React.SFC<FormProps> = (props: FormProps) => {
  const defaultFormState: any = {},
    [formState, setFormState] = useState(defaultFormState),
    [updateCount, setUpdateCount] = useState(0),
    [errorCount, setErrorCount] = useState(0);

  useEffect(() => {    
    createFormState(props.children);
  }, [])

  const createFormState = (children: JSX.Element[]): any => {
    let updatedFormState: any = formState;

    React.Children.forEach(children, (child: JSX.Element) => {    
      const type: string = FormUtility.getChildType(child);
  
      if(type === FormComponentType.Input){
        if(child.props.id !== undefined && child.props.id !== null){
          updatedFormState[child.props.id] = {
            value: child.props.defaultValue || "",
            validate: child.props.validate || null,
            error: false
          }
        }
        else{
          throw Error("All form fields must have an id.");
        }
      }
      else if(type === FormComponentType.Section){
        const section: JSX.Element = child.type(child.props),
              fields: JSX.Element = section.props.children.find((c: JSX.Element) => c.props.className === "fields")      
        createFormState(fields.props.children)
      }
      else{
        return;
      }
    })
    
    setFormState(updatedFormState)
  }
  
  const getOnChange = (child: JSX.Element): Function => {
    const onChange = (e: any) => {
      let updatedFormState: any = formState;
      updatedFormState[child.props.id] = {
        ...formState[child.props.id],
        value: e.target.value
      }
      setUpdateCount(updateCount + 1)
      setFormState(updatedFormState)
    }

    return onChange;
  }

  const handleFormChildren = (children: JSX.Element[]): any => {
    const handleFormInput = (child: JSX.Element, columns: number | undefined, index: number, alone?: boolean) => {      
      const className: string = FormUtility.input.getClasses(child, formState),
            onChange: Function = getOnChange(child),            
            style: React.CSSProperties = FormUtility.input.getStyles(index, columns, alone),
            label: JSX.Element | null = FormUtility.input.getLabel(child),
            errorMessage: JSX.Element | null = FormUtility.input.getErrorMessage(child, formState),
            onKeyUp: Function = (e: any) => {
              if(e.key === "Enter") handleOnSubmit();
            }
      return (
        <div className="input" style={style}>
          {label}
          {React.cloneElement(child, {...child.props, className, onChange, onKeyUp})}
          {errorMessage}
        </div>
      );
    }

    let altIndex: number = 0;
    
    return React.Children.map(children, (child: JSX.Element) => {
      const type: string = FormUtility.getChildType(child);      
      if(type === FormComponentType.Section){
        altIndex = 0;

        const section: JSX.Element = child.type(child.props),
              fields: JSX.Element = section.props.children.find((c: JSX.Element) => c.props.className === "fields"),
              columns: number = child.props.columns || props.columns;
        
        const updatedFields: JSX.Element[] = React.Children
          .map(fields.props.children, (c: JSX.Element, index: number) => handleFormInput(c, columns, index));

        return React.cloneElement(child, {...child.props, children: updatedFields});
      }
      else{
        return handleFormInput(child, props.columns, altIndex++, true)
      }
    })
  }
  
  const validateSubmit = (): boolean => {
    let nErrors: number = 0,    
        updatedFormState: any = formState;

    Object.entries(formState).map((entry: any) => {
      const key= entry[0],
            prop = entry[1];
      if(Validate.determineIfError(prop.value, Validate[prop.validate])){
        updatedFormState[key].error = true;
        nErrors++;
      }
      else{
        updatedFormState[key].error = false;
      }
    })
    
    setFormState(updatedFormState)
    setErrorCount(nErrors)

    return nErrors === 0;
  }

  const handleOnSubmit = () => {
    if(validateSubmit()){
      props.onSubmit(FormUtility.formatState(formState));
    }
  }

  const getFormClasses = () => {
    return classNames(
      "form", 
      {"loading": props.loading}
    )
  }

  const getFormErrorMessage = (): JSX.Element | null => {
    if(errorCount > 0){
      const errorVerb: String = errorCount > 1 ? "are" : "is",
            errorText: string = errorCount > 1 ? "errors" : "error";
      return(
        <h1 className="error-message">There {errorVerb} currently {errorCount} {errorText}. Please correct before submitting.</h1>
      )
    }

    return null;
  }
  
  return(
    <div id={props.id || undefined} className={getFormClasses()}>
      <div className="form-contents">
        {FormUtility.getTitle(props.title)}
        {handleFormChildren(props.children)}
        <div className="submit-button">
          <button type="button" className="submit-button" onClick={handleOnSubmit}>
            Submit
          </button>
          {getFormErrorMessage()}
        </div>
      </div>
      <Loading/>
    </div>
  )
}