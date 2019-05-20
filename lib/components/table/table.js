"use strict";
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
  };
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var checkbox_1 = require("../enhanced/checkbox");
var GeneralUtility = __importStar(require("../../utility"));
exports.Table = function(props) {
  var determineHeaders = function() {
    return Object.entries(props.data[0]).map(function(entry) {
      var key = entry[0];
      if (key && key !== "") {
        return GeneralUtility.camelCaseToNormal(key);
      }
      return "Empty Key";
    });
  };
  var getStyles = function(length) {
    var width = 100 / length;
    return {
      width: width + "%"
    };
  };
  var getHeader = function(value, styles) {
    return React.createElement(
      "div",
      { key: value, className: "header", style: styles },
      React.createElement("h1", null, value)
    );
  };
  var getHeaders = function() {
    var headers = determineHeaders();
    if (!headers || headers.length === 0) {
      return null;
    }
    var length = props.selectable ? headers.length + 1 : headers.length,
      styles = getStyles(length);
    headers = headers.map(function(header) {
      return getHeader(header, styles);
    });
    if (props.selectable) {
      headers.push(getHeader("Select", styles));
    }
    return headers;
  };
  var getCell = function(value, styles) {
    return React.createElement(
      "div",
      { key: value, className: "cell", style: styles },
      React.createElement(
        "div",
        { className: "value" },
        React.createElement("h1", null, value || "-")
      )
    );
  };
  var getCheckbox = function(id) {
    if (props.selectable) {
      return React.createElement(checkbox_1.Checkbox, {
        handleOnChange: function() {
          return props.onSelect(id);
        }
      });
    }
    return null;
  };
  var getCells = function(row) {
    var cells = Object.entries(row);
    if (!cells || cells.length === 0) {
      return null;
    }
    var length = props.selectable ? cells.length + 1 : cells.length,
      styles = getStyles(length);
    cells = cells.map(function(entry) {
      var value = entry[1];
      return getCell(value, styles);
    });
    if (props.selectable) {
      cells.push(getCell(getCheckbox(row.id), styles));
    }
    return cells;
  };
  var getRows = function() {
    if (!props.data || props.data.length === 0) {
      return null;
    }
    return props.data.map(function(row, index) {
      return React.createElement(
        "div",
        { key: index, className: "row" },
        getCells(row)
      );
    });
  };
  var getTableErrorMessage = function() {
    return props.errorMessage || "Error loading table data.";
  };
  var getTableEmptyMessage = function() {
    return props.emptyMessage || "Table is empty.";
  };
  if (props.data === null || props.data === undefined) {
    return React.createElement(
      "div",
      { id: props.id || "", className: "table" },
      React.createElement(
        "div",
        { className: "table-message empty" },
        React.createElement("h1", null, getTableErrorMessage())
      )
    );
  } else if (props.data.length === 0) {
    return React.createElement(
      "div",
      { id: props.id || "", className: "table" },
      React.createElement(
        "div",
        { className: "table-message empty" },
        React.createElement("h1", null, getTableEmptyMessage())
      )
    );
  } else {
    return React.createElement(
      "div",
      { id: props.id || "", className: "table" },
      React.createElement("div", { className: "headers" }, getHeaders()),
      React.createElement("div", { className: "rows" }, getRows())
    );
  }
};
