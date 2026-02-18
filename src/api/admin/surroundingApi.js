import { apiService } from "../../services/api.service";

class SurroundingApi {
  async getAll() {
    return apiService.get("surroundings");
  }

  async getById(id) {
    return apiService.get(`surroundings/${id}`);
  }

  async getByProject(projectId) {
    return apiService.get(`surroundings/project/${projectId}`);
  }

  async create(data) {
    return apiService.post("surroundings", data);
  }

  async update(id, data) {
    return apiService.patch(`surroundings/${id}`, data);
  }

  async delete(id) {
    return apiService.delete(`surroundings/${id}`);
  }
}

export const surroundingApi = new SurroundingApi();
