import React from "react"

export interface SectionProps{
  title?: string;
  children?: any;
  data?: any;
  columns?: number;
}

export const Section: React.SFC<SectionProps> = (props: SectionProps) => {
  const getTitle = (): JSX.Element | null => {
    if(props.title !== undefined && props.title !== null){
      return(
        <div className="title">
          <h1>{props.title}</h1>
        </div>
      )
    }

    return null;
  }
  
  const getChildren = (): JSX.Element[] | null => {
    return props.children || null;
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