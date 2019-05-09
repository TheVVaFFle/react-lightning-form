import React from "react";

export const convert: any = {
  to: {
    radioGroup: (children: JSX.Element[]) => {
      return (
        <div
          id={children[0].props.name}
          className="radio-group"
          type="radio-group"
        >
          {children}
        </div>
      );
    }
  }
};
