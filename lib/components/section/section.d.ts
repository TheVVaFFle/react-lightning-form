import React from "react";
export interface SectionProps {
  title?: string;
  children?: any;
  data?: any;
  columns?: number;
  loading?: boolean;
  onSubmit?: (formState: any) => void;
}
export declare const Section: React.SFC<SectionProps>;
