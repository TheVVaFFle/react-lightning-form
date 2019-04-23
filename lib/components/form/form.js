"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const loading_1 = require("../loading/loading");
const form_1 = require("../../utility/form");
var FormComponentType;
(function (FormComponentType) {
    FormComponentType["Input"] = "input";
    FormComponentType["TextArea"] = "textarea";
    FormComponentType["Section"] = "section";
})(FormComponentType = exports.FormComponentType || (exports.FormComponentType = {}));
exports.Form = (props) => {
    const defaultFormState = {}, [formState, setFormState] = react_2.useState(defaultFormState), [updateCount, setUpdateCount] = react_2.useState(0), [errorCount, setErrorCount] = react_2.useState(0);
    react_2.useEffect(() => {
        setFormState(form_1.FormUtility.state.create(formState, props.children));
    }, []);
    const handleFormChildren = (children) => {
        let altIndex = 0;
        return react_1.default.Children.map(children, (child) => {
            const type = form_1.FormUtility.get.childType(child);
            if (type === FormComponentType.Section) {
                altIndex = 0;
                const section = child.type(child.props), fields = section.props.children.find((c) => c.props.className === "fields"), columns = child.props.columns || props.columns;
                let mappedChildren = [];
                if (child.props.data) {
                    mappedChildren = form_1.FormUtility.input.mapAllFromData(child.props.data);
                }
                else {
                    mappedChildren = fields.props.children;
                }
                mappedChildren = react_1.default.Children
                    .map(mappedChildren, (mappedChild, index) => {
                    return form_1.FormUtility.input.enhance(mappedChild, formState, columns, index, updateCount, setUpdateCount, setFormState, handleOnSubmit);
                });
                return react_1.default.cloneElement(child, Object.assign({}, child.props, { children: mappedChildren }));
            }
            else {
                return form_1.FormUtility.input.enhance(child, formState, props.columns, altIndex++, updateCount, setUpdateCount, setFormState, handleOnSubmit, true);
            }
        });
    };
    const handleOnSubmit = () => {
        if (!props.loading
            && form_1.FormUtility.validate.submission(formState, setFormState, setErrorCount)) {
            props.onSubmit(form_1.FormUtility.state.format(formState));
        }
    };
    return (react_1.default.createElement("div", { id: props.id || undefined, className: form_1.FormUtility.get.classes(props.loading) },
        react_1.default.createElement("div", { className: "form-contents" },
            form_1.FormUtility.get.title(props.title),
            handleFormChildren(props.children),
            react_1.default.createElement("div", { className: "submit-button" },
                react_1.default.createElement("button", { type: "button", className: "submit-button", onClick: handleOnSubmit }, "Submit"),
                form_1.FormUtility.get.errorMessage(errorCount))),
        react_1.default.createElement(loading_1.Loading, null)));
};
