import executeFunctionWithDefaultValue from '../../helper/request-wrapper';
import http from '../../http';
import {ICreateActivity} from "./dtos/create-activity";
import {IUpdateActivity} from "./dtos/update-activity";
import {IActivity} from "./dtos/activity";

class ActivityService {
    public async create(create: ICreateActivity) {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.post('/api/activity', create);
            return response.data.data;
        }, undefined);
    }

    public async update(entity: any, update : IUpdateActivity) {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.put('/api/activity/'+entity , update);
            return response.data.data;
        }, undefined);
    }

    public async delete(entity: any) {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.delete('/api/activity/'+entity);
            return response.data.data;
        }, undefined);
    }

    public async get(entity: any): Promise<any> {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.get('/api/activity/'+entity);
            return response.data.data;
        }, undefined);
    }

    public async getAll(): Promise<Array<IActivity>> {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.get('/api/activity');
            return response.data.data;
        }, undefined);
    }
}

export default new ActivityService();