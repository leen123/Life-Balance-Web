import http from '../http';
import executeFunctionWithDefaultValue from '../helper/request-wrapper';
import MainUtils from "../../utils/main";




class Service {
    public async load(): Promise<any> {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.get('/api/configs');
            if(!MainUtils.isEmptyValue(response.data.data)){
                localStorage.setItem("user" , JSON.stringify(response.data.data?.user))
            }
            return response.data.data;
        }, undefined);
    }
}

export default new Service();