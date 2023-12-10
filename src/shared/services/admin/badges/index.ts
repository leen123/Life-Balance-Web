import executeFunctionWithDefaultValue from '../../helper/request-wrapper';
import http from '../../http';
import {CreateBadge} from "./dtos/create-badge";
import {UpdateBadge} from "./dtos/update-badge";
import {Badge} from "./dtos/badge";

class BadgesService {
    public async create(create: CreateBadge) {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.post('/api/badge', create);
            return response.data.data;
        }, undefined);
    }

    public async update(entity: any, update : UpdateBadge) {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.put('/api/badge/'+entity , update);
            return response.data.data;
        }, undefined);
    }

    public async delete(entity: any) {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.delete('/api/badge/'+entity);
            return response.data.data;
        }, undefined);
    }

    public async get(entity: any): Promise<any> {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.get('/api/badge/'+entity);
            return response.data.data;
        }, undefined);
    }

    public async getAll(): Promise<Array<Badge>> {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.get('/api/badge');
            return response.data.data;
        }, undefined);
    }
}

export default new BadgesService();