import AppConsts from '../../../constants/appconst';

const executeFunctionWithDefaultValue = async (service: any, defualt: any) => {
  try {
    return await service();
  } catch (e) {
    if (defualt === AppConsts.apiError)
      return { error: e };
    else return defualt;
  }
};
export default executeFunctionWithDefaultValue;