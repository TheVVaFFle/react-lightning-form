import React from "react";
export interface SectionProps {
  id?: string;
  title?: string;
  sectionKey?: string;
  data?: any;
  children?: any;
  submit?: any;
  onSubmit?: Function | null;
}
export declare const Section: React.SFC<SectionProps>;
