import * as React from "react";

import { Checkbox } from "../enhanced/checkbox";

import * as GeneralUtility from "../../utility";

export interface TableProps {
  id: string;
  data?: any;
  selectable?: boolean;
  errorMessage?: string;
  emptyMessage?: string;
  onSelect?: any;
}

export const Table: React.SFC<TableProps> = (props: TableProps) => {
  const determineHeaders = (): string[] => {
    return Object.entries(props.data[0]).map((entry: any) => {
      const key: string = entry[0];
      if (key && key !== "") {
        return GeneralUtility.camelCaseToNormal(key);
      }
      return "Empty Key";
    });
  };

  const getStyles = (length: number): React.CSSProperties => {
    const width: number = 100 / length;
    return {
      width: `${width}%`
    };
  };

  const getHeader = (value: any, styles: React.CSSProperties): JSX.Element => {
    return (
      <div key={value} className="header" style={styles}>
        <h1>{value}</h1>
      </div>
    );
  };

  const getHeaders = (): JSX.Element[] | null => {
    let headers: string[] | JSX.Element[] = determineHeaders();

    if (!headers || headers.length === 0) {
      return null;
    }

    const length: number = props.selectable
        ? headers.length + 1
        : headers.length,
      styles: React.CSSProperties = getStyles(length);

    headers = headers.map((header: string) => getHeader(header, styles));

    if (props.selectable) {
      headers.push(getHeader("Select", styles));
    }

    return headers;
  };

  const getCell = (value: any, styles: React.CSSProperties): JSX.Element => {
    return (
      <div key={value} className="cell" style={styles}>
        <div className="value">
          <h1>{value || "-"}</h1>
        </div>
      </div>
    );
  };

  const getCheckbox = (id: string | number): JSX.Element | null => {
    if (props.selectable) {
      return <Checkbox handleOnChange={() => props.onSelect(id)} />;
    }

    return null;
  };

  const getCells = (row: any): JSX.Element[] | null => {
    let cells: any[] = Object.entries(row);

    if (!cells || cells.length === 0) {
      return null;
    }

    const length: number = props.selectable ? cells.length + 1 : cells.length,
      styles: React.CSSProperties = getStyles(length);

    cells = cells.map((entry: any) => {
      const value: any = entry[1];
      return getCell(value, styles);
    });

    if (props.selectable) {
      cells.push(getCell(getCheckbox(row.id), styles));
    }

    return cells;
  };

  const getRows = (): JSX.Element[] | null => {
    if (!props.data || props.data.length === 0) {
      return null;
    }

    return props.data.map((row: any, index: number) => {
      return (
        <div key={index} className="row">
          {getCells(row)}
        </div>
      );
    });
  };

  const getTableErrorMessage = () => {
    return props.errorMessage || "Error loading table data.";
  };

  const getTableEmptyMessage = () => {
    return props.emptyMessage || "Table is empty.";
  };

  if (props.data === null || props.data === undefined) {
    return (
      <div id={props.id || ""} className="table">
        <div className="table-message empty">
          <h1>{getTableErrorMessage()}</h1>
        </div>
      </div>
    );
  } else if (props.data.length === 0) {
    return (
      <div id={props.id || ""} className="table">
        <div className="table-message empty">
          <h1>{getTableEmptyMessage()}</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div id={props.id || ""} className="table">
        <div className="headers">{getHeaders()}</div>
        <div className="rows">{getRows()}</div>
      </div>
    );
  }
};