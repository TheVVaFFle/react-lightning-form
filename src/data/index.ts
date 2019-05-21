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
        label: "Custom First Name"
      },
      middleName: { value: "Bob" },
      lastName: { value: "Smith", validate: ValidationType.Required },
      suffix: {
        value: "",
        type: FormComponentType.Dropdown,
        options: suffixOptions
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
        value: "",
        type: FormComponentType.RadioGroup,
        name: "favorite-color",
        options: colorOptions
      }
    },
    search: {
      headers: ["ID", "MAKE", "MODEL", "YEAR OF PRODUCTION"],
      results: [
        { id: 1, make: "Ford", model: "Fusion", yearOfProduction: "2012" },
        { id: 2, make: "Dodge", model: "Charger", yearOfProduction: "2015" },
        { id: 3, make: "Chevy", model: "Corvette", yearOfProduction: "2017" },
        { id: 4, make: "Dodge", model: "Viper", yearOfProduction: "2018" },
        { id: 5, make: "Ford", model: "Mustang", yearOfProduction: "2014" }
      ]
    }
  }
};
