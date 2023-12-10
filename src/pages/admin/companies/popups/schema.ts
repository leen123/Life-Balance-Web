import * as yup from "yup";

export const schema = (messages: any) => {
  return yup.object().shape({
    name: yup.string().required(messages["Name.required"]),
    email: yup.string().required(messages["Email.required"]),
    phone_number: yup.string().required(messages["PhoneNumber.required"]),
  });
};
