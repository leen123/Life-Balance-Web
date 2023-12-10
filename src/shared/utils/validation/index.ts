import _ from "lodash";

export const validate = async (schema: any, values: any) => {
  const options = { abortEarly: false };

  try {
    await schema.validate(values, options);
    return null;
  } catch (error) {
    const errors = {};
    for (let item of error.inner) {
      _.set(errors, item.path, item.message);
    }
    return errors;
  }
};
