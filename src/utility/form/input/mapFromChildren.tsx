import { is } from "./is";
import { convert } from "./convert";

export const mapFromChildren = (fields: JSX.Element) => {
  const isRadioGroup: boolean = is.radioGroup(fields.props.children);
  if (isRadioGroup) {
    return [convert.to.radioGroup(fields.props.children)];
  } else {
    return fields.props.children;
  }
};
