"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var form_1 = require("../../../components/form/form");
exports.is = {
  radioGroup: function(children) {
    if (!Array.isArray(children)) {
      return false;
    }
    var nRadios = children.filter(function(c) {
      return c.props.type === form_1.FormComponentType.Radio;
    }).length;
    return nRadios === children.length;
  }
};
