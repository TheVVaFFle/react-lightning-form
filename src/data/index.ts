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

const handleSubmitForm = (data: any) => {
  console.log(data);
};

const handleSubmitName = (data: any) => {
  console.log(data);
};

const handleSubmitAbout = (data: any) => {
  console.log(data);
};

const handleSubmitFamily = (data: any) => {
  console.log(data);
};

const handleSubmitLocation = (data: any) => {
  console.log(data);
};

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
    about: {
      age: (age: number) => {
        return !isNaN(age);
      }
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
  submit: {
    form: handleSubmitForm,
    name: handleSubmitName,
    about: handleSubmitAbout,
    family: handleSubmitFamily,
    location: handleSubmitLocation
  },
  messages: {
    about: {}
  },
  types: {
    comments: RLFComponentType.Textarea
  }
};
