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
      permanent: true
    }
  },
  options: {
    suffix: suffixOptions,
    relation: relationOptions,
    sex: sexOptions
  }
};
