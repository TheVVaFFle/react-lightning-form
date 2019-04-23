"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_1 = require("react");
const form_1 = require("../form/form");
const section_1 = require("../section/section");
const data_1 = require("../../data");
require('./app.scss');
exports.App = (props) => {
    const [loading, setLoading] = react_1.useState(true);
    const simulateLoading = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
    };
    react_1.useEffect(() => {
        simulateLoading();
    }, []);
    const handleOnSubmit = (formState) => {
        console.log(formState);
        simulateLoading();
    };
    const validateComments = (value) => {
        return value.length >= 20 && value.length <= 50;
    };
    return (React.createElement("div", { id: "app" },
        React.createElement(form_1.Form, { id: "app-form", title: "My Form", loading: loading, onSubmit: handleOnSubmit },
            React.createElement(section_1.Section, { title: "Name", columns: 4, data: data_1.Test.data.name }),
            React.createElement(section_1.Section, { title: "Contact", columns: 2, data: data_1.Test.data.contact }),
            React.createElement("textarea", { id: "comments", placeholder: "Enter comments here", label: "Comments", validate: validateComments, errormessage: "Must be between 20 and 50 characters." }))));
};
