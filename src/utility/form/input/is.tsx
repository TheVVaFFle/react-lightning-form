import { FormComponentType } from "../../../components/form/form";

export const is: any = {
  radioGroup: (children: JSX.Element[]): boolean => {
    const nRadios: number = children.filter(
      (c: JSX.Element) => c.props.type === FormComponentType.Radio
    ).length;
    return nRadios === children.length;
  }
};
