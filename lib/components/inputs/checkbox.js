"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const GeneralUtility = __importStar(require("../../utility"));
exports.Checkbox = (props) => {
    const formattedKey = GeneralUtility.camelCaseToNormal(props.id);
    return (react_1.default.createElement("div", { className: "checkbox" },
        react_1.default.createElement("input", { id: GeneralUtility.camelCaseToKebab(props.id), key: props.id, type: "checkbox", className: "checkbox", checked: props.value, label: formattedKey })));
};
