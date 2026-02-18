import { apiService } from "../../services/api.service";

class AssetApi {
  async getAll() {
    return apiService.get("assets");
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
