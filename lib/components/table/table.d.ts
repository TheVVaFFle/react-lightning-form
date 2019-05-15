import * as React from "react";
export interface TableProps {
  id: string;
  data?: any;
  selectable?: boolean;
  onSelect?: any;
}
export declare const Table: React.SFC<TableProps>;
