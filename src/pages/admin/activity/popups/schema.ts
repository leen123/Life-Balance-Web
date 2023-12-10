import * as yup from "yup";

export const schema = (messages: any) => {
  return yup.object().shape({
    name: yup.string().required(messages["Name.required"]),
    points: yup.number().required(messages["Points.required"]),
    section_id: yup.number().required(messages["Section.required"]),
    image: yup.string().required(messages["Image.required"]),
  });
};
