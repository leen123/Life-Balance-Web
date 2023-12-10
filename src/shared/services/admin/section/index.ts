import executeFunctionWithDefaultValue from '../../helper/request-wrapper';
import http from '../../http';
import {ICreateSection} from "./dtos/create-section";
import {IUpdateSection} from "./dtos/update-section";
import {ISection} from "./dtos/section";

class SectionService {
    public async create(create: ICreateSection) {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.post('/api/section', create);
            return response.data.data;
        }, undefined);
    }

    public async update(entity: any, update : IUpdateSection) {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.put('/api/section/'+entity , update);
            return response.data.data;
        }, undefined);
    }

    public async delete(entity: any) {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.delete('/api/section/'+entity);
            return response.data.data;
        }, undefined);
    }

    public async get(entity: any): Promise<any> {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.get('/api/section/'+entity);
            return response.data.data;
        }, undefined);
    }

    public async getAll(): Promise<Array<ISection>> {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.get('/api/section');
            return response.data.data;
        }, undefined);
    }
}

export default new SectionService();