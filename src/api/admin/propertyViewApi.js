import { apiService } from "../../services/api.service";

class PropertyViewApi {
  async getAll() {
    return apiService.get("property-views");
  }

  async getById(id) {
    return apiService.get(`property-views/${id}`);
  }

  async getByProperty(propertyId) {
    return apiService.get(`property-views/property/${propertyId}`);
  }

  async create(data) {
    return apiService.post("property-views", data);
  }

  async update(id, data) {
    return apiService.patch(`property-views/${id}`, data);
  }

  async delete(id) {
    return apiService.delete(`property-views/${id}`);
  }
}

export const propertyViewApi = new PropertyViewApi();
