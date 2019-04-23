"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
exports.Section = (props) => {
    const getTitle = () => {
        if (props.title !== undefined && props.title !== null) {
            return (react_1.default.createElement("div", { className: "title" },
                react_1.default.createElement("h1", null, props.title)));
        }
        return null;
    };
    const getChildren = () => {
        return props.children || null;
    };
    return (react_1.default.createElement("div", { className: "section" },
        getTitle(),
        react_1.default.createElement("div", { className: "fields" }, getChildren())));
};
