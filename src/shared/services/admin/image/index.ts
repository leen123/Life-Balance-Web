import executeFunctionWithDefaultValue from '../../helper/request-wrapper';
import http from '../../http';
import {IImage} from "./dtos/image";
import {ICreateImage} from "./dtos/create-image";
import {IUpdateImage} from "./dtos/update-image";

class ImageService {
    public async create(create: ICreateImage) {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.post('/api/images', create);
            return response.data.data;
        }, undefined);
    }

    public async update(entity: any, update : IUpdateImage) {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.put('/api/images/'+entity , update);
            return response.data.data;
        }, undefined);
    }

    public async delete(entity: any) {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.delete('/api/images/'+entity);
            return response.data.data;
        }, undefined);
    }

    public async get(entity: any): Promise<any> {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.get('/api/images/'+entity);
            return response.data.data;
        }, undefined);
    }

    public async getAll(): Promise<Array<IImage>> {
        return await executeFunctionWithDefaultValue(async () => {
            let response = await http.get('/api/images');
            return response.data.data;
        }, undefined);
    }
}

export default new ImageService();