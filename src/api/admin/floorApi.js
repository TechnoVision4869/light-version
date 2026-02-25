import { apiService } from "../../services/api.service";

class FloorApi {
  async getAll() {
    return apiService.get("floors");
  }

  async getById(id) {
    return apiService.get(`floors/${id}`);
  }

  async getByProperty(propertyId) {
    return apiService.get(`floors/property/${propertyId}`);
  }

  async create(data) {
    return apiService.post("floors", data);
  }

  async update(id, data) {
    return apiService.patch(`floors/${id}`, data);
  }

  async delete(id) {
    return apiService.delete(`floors/${id}`);
  }
}

export const floorApi = new FloorApi();
