import * as yup from "yup";

export const schema = (messages: any) => {
  return yup.object().shape({
    title: yup.string().required(messages["Name.required"]),
    url: yup.string().required(messages["Url.required"]),
  });
};

export const schemaUpdate = (messages: any) => {
  return yup.object().shape({
    name: yup.string().required(messages["Name.required"]),
    image: yup.string().required(messages["Image.required"]),
  });
};
