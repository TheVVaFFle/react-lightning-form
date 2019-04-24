"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_1 = require("react");
var form_1 = require("../form/form");
var section_1 = require("../section/section");
var data_1 = require("../../data");
require('./app.scss');
exports.App = function (props) {
    var _a = react_1.useState(true), loading = _a[0], setLoading = _a[1];
    var simulateLoading = function () {
        setLoading(true);
        setTimeout(function () { return setLoading(false); }, 1000);
    };
    react_1.useEffect(function () {
        simulateLoading();
    }, []);
    var handleOnSubmit = function (formState) {
        console.log(formState);
        simulateLoading();
    };
    var validateComments = function (value) {
        return value.length >= 20 && value.length <= 50;
    };
    return (React.createElement("div", { id: "app" },
        React.createElement(form_1.Form, { id: "app-form", title: "My Form", loading: loading, onSubmit: handleOnSubmit },
            React.createElement(section_1.Section, { title: "Name", columns: 4, data: data_1.Test.data.name }),
            React.createElement(section_1.Section, { title: "Contact", columns: 2, data: data_1.Test.data.contact }),
            React.createElement("textarea", { id: "comments", placeholder: "Enter comments here", label: "Comments", validate: validateComments, errormessage: "Must be between 20 and 50 characters." }))));
};
