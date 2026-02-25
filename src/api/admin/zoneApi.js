import { apiService } from "../../services/api.service";

class ZoneApi {
  async getAll() {
    return apiService.get("zones");
  }

  async getById(id) {
    return apiService.get(`zones/${id}`);
  }

  async getByProject(projectId) {
    return apiService.get(`zones/project/${projectId}`);
  }

  async create(data) {
    return apiService.post("zones", data);
  }

  async update(id, data) {
    return apiService.patch(`zones/${id}`, data);
  }

  async delete(id) {
    return apiService.delete(`zones/${id}`);
  }
}

export const zoneApi = new ZoneApi();
