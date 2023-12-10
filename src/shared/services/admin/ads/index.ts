import executeFunctionWithDefaultValue from "../../helper/request-wrapper";
import http from "../../http";
import { IADs } from "./dtos/ads";

class ADsService {
  public async create(create: IADs) {
    return await executeFunctionWithDefaultValue(async () => {
      let response = await http.post("/api/admin/ads", create);
      return response.data.data;
    }, undefined);
  }

  public async update(entity: any, update: IADs) {
    return await executeFunctionWithDefaultValue(async () => {
      let response = await http.put("/api/admin/ads/" + entity, update);
      return response.data.data;
    }, undefined);
  }

  public async delete(entity: any) {
    return await executeFunctionWithDefaultValue(async () => {
      let response = await http.delete("/api/admin/ads/" + entity);
      return response.data.data;
    }, undefined);
  }

  public async get(entity: any): Promise<IADs> {
    return await executeFunctionWithDefaultValue(async () => {
      let response = await http.get("/api/admin/ads/" + entity);
      return response.data.data;
    }, undefined);
  }

  public async getAll(): Promise<Array<IADs>> {
    return await executeFunctionWithDefaultValue(async () => {
      let response = await http.get("/api/admin/ads");
      return response.data.data;
    }, undefined);
  }
}

export default new ADsService();
