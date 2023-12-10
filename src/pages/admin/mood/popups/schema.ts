import * as yup from "yup";

export const schema = (messages: any) => {
  return yup.object().shape({
    name: yup.string().required(messages["Name.required"]),
    image: yup.string().required(messages["Image.required"]),
  });
};
