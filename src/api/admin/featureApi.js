import { apiService } from "../../services/api.service";

class FeatureApi {
  async getAll(params = {}) {
    const res = await apiService.get("features", params);
    if (res && Array.isArray(res.data)) return res.data;
    return Array.isArray(res) ? res : [];
  }

  async getById(id) {
    return apiService.get(`features/${id}`);
  }

  async getByProperty(propertyId) {
    if (!propertyId) return [];
    const res = await apiService.get(`features/property/${propertyId}`);
    return Array.isArray(res) ? res : [];
  }

  async getByFloor(floorId) {
    if (!floorId) return [];
    const res = await apiService.get(`features/floor/${floorId}`);
    return Array.isArray(res) ? res : [];
  }

  async create(data) {
    return apiService.post("features", data);
  }

  async update(id, data) {
    return apiService.put(`features/${id}`, data);
  }

  async delete(id) {
    return apiService.delete(`features/${id}`);
  }
}

export const featureApi = new FeatureApi();
