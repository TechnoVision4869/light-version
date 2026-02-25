import { apiService } from "../../services/api.service";

/**
 * Blocks belong to properties (townhouse only).
 * Stub: backend may expose blocks under properties or a dedicated resource.
 */
class BlockApi {
  async getByProperty(propertyId) {
    try {
      const data = await apiService.get(`blocks/property/${propertyId}`);
      return Array.isArray(data) ? data : (data?.items ?? []);
    } catch {
      return [];
    }
  }

  async getById(id) {
    return apiService.get(`blocks/${id}`);
  }

  async create(data) {
    return apiService.post("blocks", data);
  }

  async update(id, data) {
    return apiService.patch(`blocks/${id}`, data);
  }

  async delete(id) {
    return apiService.delete(`blocks/${id}`);
  }
}

export const blockApi = new BlockApi();
