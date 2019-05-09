"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("./state");
var validate_1 = require("./validate");
var get_1 = require("./get");
var input_1 = require("./input");
var handleData_1 = require("./input/handleData");
var mapFromChildren_1 = require("./input/mapFromChildren");
exports.FormUtility = {
  stateManager: state_1.state,
  validate: validate_1.validate,
  get: get_1.get,
  input: input_1.input,
  map: {
    from: {
      data: handleData_1.handleData
    }
  },
  handle: {
    children: mapFromChildren_1.mapFromChildren
  }
};
