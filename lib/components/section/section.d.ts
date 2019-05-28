import React from "react";
export interface RLFSectionProps {
  id?: string;
  title?: string;
  sectionKey?: string;
  data?: any;
  children?: any;
  submit?: any;
  onSubmit?: Function | null;
}
export declare const RLFSection: React.SFC<RLFSectionProps>;
