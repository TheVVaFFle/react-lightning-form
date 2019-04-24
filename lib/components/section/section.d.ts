import React from "react";
export interface SectionProps {
    title?: string;
    children?: any;
    data?: any;
    columns?: number;
}
export declare const Section: React.SFC<SectionProps>;
