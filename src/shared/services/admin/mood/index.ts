import executeFunctionWithDefaultValue from '../../helper/request-wrapper';
import http from '../../http';
import {ICreateMood} from "./dtos/create-mood";
import {IUpdateMood} from "./dtos/update-mood";
import {IMood} from "./dtos/mood";

class MoodService {
    public async create(create: ICreateMood) {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.post('/api/mood', create);
            return response.data.data;
        }, undefined);
    }

    public async update(entity: any, update : IUpdateMood) {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.put('/api/mood/'+entity , update);
            return response.data.data;
        }, undefined);
    }

    public async delete(entity: any) {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.delete('/api/mood/'+entity);
            return response.data.data;
        }, undefined);
    }

    public async get(entity: any): Promise<any> {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.get('/api/mood/'+entity);
            return response.data.data;
        }, undefined);
    }

    public async getAll(): Promise<Array<IMood>> {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.get('/api/mood');
            return response.data.data;
        }, undefined);
    }
}

export default new MoodService();