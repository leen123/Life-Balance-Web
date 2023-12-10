import http from '../../http';
import executeFunctionWithDefaultValue from '../../helper/request-wrapper';

class Service {
    public async loginUser(data :any) {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.post('/api/login' , data);
            return response.data?.data;
        }, undefined);
    }

    public async changePassword(data :any) {
        return await executeFunctionWithDefaultValue(async () => {
            return await http.put('/api/changePassword', data);
        }, undefined);
    }
}

export default new Service();