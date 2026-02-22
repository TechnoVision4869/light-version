import { apiService } from "../../services/api.service";

class DeveloperApi {
  async getAll() {
    const res = await apiService.get("developers");
    if (res && Array.isArray(res.data)) return res.data;
    return Array.isArray(res) ? res : [];
  }

  async getById(id) {
    return apiService.get(`developers/${id}`);
  }

  async create(data) {
    return apiService.post("developers", data);
  }

  async update(id, data) {
    return apiService.patch(`developers/${id}`, data);
  }

  async delete(id) {
    return apiService.delete(`developers/${id}`);
  }
}

export const developerApi = new DeveloperApi();
