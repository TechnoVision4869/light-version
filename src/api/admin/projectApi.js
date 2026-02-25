import { apiService } from "../../services/api.service";

class ProjectApi {
  async getAll() {
    return apiService.get("projects");
  }

  async getById(id) {
    return apiService.get(`projects/${id}`);
  }

  async create(data) {
    return apiService.post("projects", data);
  }

  async update(id, data) {
    return apiService.patch(`projects/${id}`, data);
  }

  async delete(id) {
    return apiService.delete(`projects/${id}`);
  }

  async getByDeveloper(developerId) {
    return apiService.get(`projects/developer/${developerId}`);
  }
}

export const projectApi = new ProjectApi();
