import * as yup from "yup";

export const schema = (messages: any) => {
  return yup.object().shape({
    image: yup.string().required(messages["Image.required"]),
  });
};
