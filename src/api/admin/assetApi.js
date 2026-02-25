import { apiService } from "../../services/api.service";

class AssetApi {
  async getAll() {
    return apiService.get("assets");
  }

  /**
   * List assets with optional filters (search, type, tag, isActive).
   * @param {{ search?: string, type?: string, tag?: string, isActive?: boolean }} filters
   */
  async list(filters = {}) {
    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.type && filters.type !== "all") params.type = filters.type;
    if (filters.tag) params.tag = filters.tag;
    if (filters.isActive !== undefined) params.isActive = String(filters.isActive);
    return apiService.get("assets", Object.keys(params).length ? params : undefined);
  }

  async getById(id) {
    return apiService.get(`assets/${id}`);
  }

  async getByDeveloper(developerId) {
    return apiService.get(`assets/developer/${developerId}`);
  }

  async upload(formData) {
    return apiService.post("assets/upload", formData, {
      contentType: "multipart/form-data",
    });
  }

  async update(id, data) {
    return apiService.patch(`assets/${id}`, data);
  }

  async delete(id) {
    return apiService.delete(`assets/${id}`);
  }
}

export const assetApi = new AssetApi();
