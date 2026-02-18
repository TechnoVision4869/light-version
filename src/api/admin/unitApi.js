import { apiService } from "../../services/api.service";

class UnitApi {
  async getAll() {
    return apiService.get("units");
  }

  async getById(id) {
    return apiService.get(`units/${id}`);
  }

  async getByProperty(propertyId) {
    return apiService.get(`units/property/${propertyId}`);
  }

  async getByFloor(floorId) {
    return apiService.get(`units/floor/${floorId}`);
  }

  async getByBlock(blockId) {
    return apiService.get(`units/block/${blockId}`);
  }

  async getByCode(unitCode) {
    return apiService.get(`units/code/${unitCode}`);
  }

  async create(data) {
    return apiService.post("units", data);
  }

  async update(id, data) {
    return apiService.patch(`units/${id}`, data);
  }

  async delete(id) {
    return apiService.delete(`units/${id}`);
  }
}

export const unitApi = new UnitApi();
