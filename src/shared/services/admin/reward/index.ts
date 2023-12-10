import executeFunctionWithDefaultValue from '../../helper/request-wrapper';
import http from '../../http';
import {ICreateReward} from "./dtos/create-reward";
import {IUpdateReward} from "./dtos/update-reward";
import {IReward} from "./dtos/reward";

class RewardService {
    public async create(create: ICreateReward) {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.post('/api/reward', create);
            return response.data.data;
        }, undefined);
    }

    public async update(entity: any, update : IUpdateReward) {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.put('/api/reward/'+entity , update);
            return response.data.data;
        }, undefined);
    }

    public async delete(entity: any) {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.delete('/api/reward/'+entity);
            return response.data.data;
        }, undefined);
    }

    public async get(entity: any): Promise<any> {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.get('/api/reward/'+entity);
            return response.data.data;
        }, undefined);
    }

    public async getAll(): Promise<Array<IReward>> {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.get('/api/reward');
            return response.data.data;
        }, undefined);
    }
}

export default new RewardService();