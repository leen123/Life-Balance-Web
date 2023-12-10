import * as yup from "yup";

export const schema = (messages: any) => {
  return yup.object().shape({
    code: yup.string().required(messages["Code.required"]),
    name: yup.string().required(messages["Name.required"]),
    quantity_points: yup.number().required(messages["QuantityPoints.required"]),
    image: yup.string().required(messages["Image.required"]),
  });
};
