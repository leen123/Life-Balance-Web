import executeFunctionWithDefaultValue from "../../helper/request-wrapper";
import http from "../../http";
import { ICoupons } from "./dtos/coupons";

class CouponsService {
  public async create(create: ICoupons) {
    alert("coupom");
    return await executeFunctionWithDefaultValue(async () => {
      let response = await http.post("/api/admin/coupon", create);
      return response.data.data;
    }, undefined);
  }

  public async update(entity: any, update: ICoupons) {
    return await executeFunctionWithDefaultValue(async () => {
      let response = await http.put("/api/admin/coupon/" + entity, update);
      return response.data.data;
    }, undefined);
  }

  public async delete(entity: any) {
    return await executeFunctionWithDefaultValue(async () => {
      let response = await http.delete("/api/admin/coupon/" + entity);
      return response.data.data;
    }, undefined);
  }

  public async get(entity: any): Promise<ICoupons> {
    return await executeFunctionWithDefaultValue(async () => {
      let response = await http.get("/api/admin/coupon/" + entity);
      return response.data.data;
    }, undefined);
  }

  public async getAll(): Promise<Array<ICoupons>> {
    return await executeFunctionWithDefaultValue(async () => {
      let response = await http.get("/api/admin/coupon");
      return response.data.data;
    }, undefined);
  }
}

export default new CouponsService();
