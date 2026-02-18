import { apiService } from "../../services/api.service";

class AmenityApi {
  async getAll(projectId) {
    return new Promise((resolve, reject) => {
      try {
        const query = projectId ? { projectId } : undefined;
        const resp = apiService.get("amenities", query);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getById(id) {
    return apiService.get(`amenities/${id}`);
  }

  async create(data) {
    return apiService.post("amenities", data);
  }

  async update(id, data) {
    return apiService.patch(`amenities/${id}`, data);
  }

  async delete(id) {
    return apiService.delete(`amenities/${id}`);
  }
}

export const amenityApi = new AmenityApi();
