import { ValidationType, InputType } from "../utility/validation";
export declare const Test: {
    data: {
        name: {
            firstName: {
                value: string;
                validate: ValidationType;
            };
            middleName: {
                value: string;
            };
            lastName: {
                value: string;
                validate: ValidationType;
            };
            suffix: {
                value: string;
                type: InputType;
                options: string[];
                validate: ValidationType;
            };
        };
        contact: {
            phoneNumber: {
                value: string;
                validate: ValidationType;
            };
            emailAddress: {
                value: string;
                validate: ValidationType;
            };
            primaryContact: {
                value: boolean;
                type: InputType;
            };
        };
    };
};
