import {ValidationType, InputType} from "../utility/validation";

const suffixOptions: string[] = [
  "Sr.",
  "Jr.",
  "I",
  "II",
  "III"
]

export const Test = {
  data: {      
    name: {
      firstName: { value: "Billy", validate: ValidationType.Required },
      middleName: { value: "Bob" },
      lastName: { value: "Smith", validate: ValidationType.Required },
      suffix: { value: "", type: InputType.Dropdown, options: suffixOptions, validate: ValidationType.Required } 
    },
    contact: {
      phoneNumber: { value: "(314) 780-5555", validate: ValidationType.Phone },
      emailAddress: { value: "my-email@gmail.com", validate: ValidationType.Email },
      primaryContact: { value: false, type: InputType.Checkbox }
    }
  }
}