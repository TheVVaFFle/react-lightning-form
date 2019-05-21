import * as React from "react";

import { Checkbox } from "../enhanced/checkbox";

import * as GeneralUtility from "../../utility";

export interface TableProps {
  id: string;
  data?: any;
  selectable?: boolean;
  defaultHeaders?: string[];
  errorMessage?: string;
  emptyMessage?: string;
  onSelect?: any;
}

export const Table: React.SFC<TableProps> = (props: TableProps) => {
  const determineHeaders = (): string[] => {
    if (props.data && props.data.length > 0) {
      return Object.entries(props.data[0]).map((entry: any) => {
        const key: string = entry[0];
        if (key && key !== "") {
          return GeneralUtility.camelCaseToNormal(key);
        }
        return "Empty Key";
      });
    } else if (props.defaultHeaders && props.defaultHeaders.length > 0) {
      return props.defaultHeaders;
    } else {
      return [];
    }
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
    console.log(headers);
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
    const errorMessage: string =
      props.errorMessage || "Error loading table data.";

    if (props.data === null || props.data === undefined) {
      return (
        <div className="table-message error">
          <h1>( {errorMessage} )</h1>
        </div>
      );
    }

    return null;
  };

  const getTableEmptyMessage = () => {
    const emptyMessage: string = props.emptyMessage || "Table is empty.";

    if (props.data && props.data.length === 0) {
      return (
        <div className="table-message empty">
          <h1>( {emptyMessage} )</h1>
        </div>
      );
    }

    return null;
  };

  return (
    <div id={props.id || ""} className="table">
      <div className="headers">{getHeaders()}</div>
      <div className="rows">{getRows()}</div>
      {getTableEmptyMessage()}
      {getTableErrorMessage()}
    </div>
  );
};
