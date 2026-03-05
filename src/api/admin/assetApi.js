import { apiService } from "../../services/api.service";

class AssetApi {
  async getAll() {
    return apiService.get("assets");
  }

  /**
   * List assets with optional filters (search, type, tag, isActive, developerId).
   * @param {{ search?: string, type?: string, tag?: string, isActive?: boolean, developerId?: string }} filters
   */
  async list(filters = {}) {
    const params = {};
    if (filters.limit) params.limit = filters.limit;
    if (filters.type && filters.type !== "all") params.type = filters.type;
    if (filters.developerId) params.developerId = filters.developerId;
    return apiService.get(
      "assets",
      Object.keys(params).length ? params : undefined,
    );
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

  async getAssetFileUrl(assetId) {
    return apiService.parseEndpoint(`assets/file/${assetId}`);
  }
}

export const assetApi = new AssetApi();
