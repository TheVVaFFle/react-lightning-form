import { FormComponentType } from "../components/form/form";
import { ValidationType } from "../utility/validation";

const suffixOptions: string[] = ["Sr.", "Jr.", "I", "II", "III"],
  colorOptions: string[] = ["Red", "Green", "Blue"];

export const validateComments = (value: string) => {
  return value && value.length >= 10 && value.length <= 30;
};

export const Test = {
  data: {
    name: {
      firstName: {
        value: "Billy",
        validate: ValidationType.Required,
        label: "Custom First Name"
      },
      middleName: { value: "Bob" },
      lastName: { value: "Smith", validate: ValidationType.Required },
      suffix: {
        value: "",
        type: FormComponentType.Dropdown,
        options: suffixOptions,
        validate: ValidationType.Required
      }
    },
    contact: {
      phoneNumber: {
        value: "(314) 780-5555",
        validate: ValidationType.Phone
      },
      emailAddress: {
        value: "my-email@gmail.com",
        validate: ValidationType.Email
      },
      primaryContact: { value: false, type: FormComponentType.Checkbox }
    },
    comments: {
      value: "",
      type: FormComponentType.TextArea,
      validate: validateComments,
      errormessage: "Must be between 10 and 30 characters."
    },
    about: {
      favoriteColor: {
        type: FormComponentType.RadioGroup,
        name: "favorite-color",
        options: colorOptions
      }
    }
  }
};
