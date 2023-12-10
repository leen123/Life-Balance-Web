import executeFunctionWithDefaultValue from "../../helper/request-wrapper";
import http from "../../http";
import { ICompany } from "./dtos/company";

class CompanyService {
  public async create(create: ICompany) {
    return await executeFunctionWithDefaultValue(async () => {
      let response = await http.post("/api/admin/companies", create);
      return response.data.data;
    }, undefined);
  }

  public async update(entity: any, update: ICompany) {
    return await executeFunctionWithDefaultValue(async () => {
      let response = await http.put("/api/admin/companies/" + entity, update);
      return response.data.data;
    }, undefined);
  }

  public async delete(entity: any) {
    return await executeFunctionWithDefaultValue(async () => {
      let response = await http.delete("/api/admin/companies/" + entity);
      return response.data.data;
    }, undefined);
  }

  public async get(entity: any): Promise<ICompany> {
    return await executeFunctionWithDefaultValue(async () => {
      let response = await http.get("/api/admin/companies/" + entity);
      return response.data.data;
    }, undefined);
  }

  public async getAll(): Promise<Array<ICompany>> {
    return await executeFunctionWithDefaultValue(async () => {
      let response = await http.get("/api/admin/companies");
      return response.data.data;
    }, undefined);
  }
}

export default new CompanyService();
