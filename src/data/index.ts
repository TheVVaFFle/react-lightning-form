import { FormComponentType } from "../components/form/form";
import { ValidationType } from "../utility/validation";

const suffixOptions: string[] = ["Sr.", "Jr.", "I", "II", "III"];

const validateComments = (value: string) => {
  return value && value.length >= 20 && value.length <= 50;
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
      section1: {
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
      section2: {
        comments: {
          value: "",
          type: FormComponentType.TextArea,
          validate: validateComments,
          errormessage: "Must be between 20 and 50 characters."
        }
      }
    }
  }
};
