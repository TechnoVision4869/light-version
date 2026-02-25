import { apiService } from "../../services/api.service";

class PropertyApi {
  async getAll() {
    return apiService.get("properties");
  }

  async getById(id) {
    return apiService.get(`properties/${id}`);
  }

  async getByZone(zoneId) {
    return apiService.get(`properties/zone/${zoneId}`);
  }

  async create(data) {
    return apiService.post("properties", data);
  }

  async update(id, data) {
    return apiService.patch(`properties/${id}`, data);
  }

  async delete(id) {
    return apiService.delete(`properties/${id}`);
  }
}

export const propertyApi = new PropertyApi();
