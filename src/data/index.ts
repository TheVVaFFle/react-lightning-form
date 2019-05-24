import { RLFComponentType, RLFValidationType } from "../components/form/form";

const suffixOptions: string[] = ["Sr.", "Jr.", "I", "II", "III"],
  relationOptions: string[] = [
    "Father",
    "Mother",
    "Sibling",
    "Other Relative",
    "Friend",
    "Enemy"
  ],
  sexOptions: string[] = ["Male", "Female", "Cheetah", "Other"];

export const Test = {
  data: {
    name: {
      firstName: "Cory",
      middleName: "Eduard",
      lastName: "Loeffelman",
      suffix: ""
    },
    about: {
      age: 26,
      sex: "Male",
      birthday: "08/29/1992"
    },
    family: {
      heritage: "Czechoslovakian",
      members: [
        { firstName: "Ed", lastName: "Loeffelman", relation: "Father" },
        { firstName: "Karen", lastName: "Loeffelman", relation: "Mother" },
        { firstName: "Melanie", lastName: "Loeffelman", relation: "Sibling" }
      ]
    },
    location: {
      city: "Columbia",
      state: "Mo",
      zip: "65201",
      permanent: false
    },
    comments: "This is a comment!"
  },
  options: {
    suffix: suffixOptions,
    relation: relationOptions,
    sex: sexOptions
  },
  validation: {
    name: {
      suffix: RLFValidationType.Required
    },
    family: {
      heritage: RLFValidationType.Required,
      members: {
        firstName: RLFValidationType.Required,
        lastName: RLFValidationType.Required
      }
    },
    location: {
      permanent: RLFValidationType.Required
    },
    comments: RLFValidationType.Required
  },
  types: {
    comments: RLFComponentType.Textarea
  }
};
