import { apiService } from "../../services/api.service";

class AssetApi {
  async getAll() {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get("assets");
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`assets/${id}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getByDeveloper(developerId) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`assets/developer/${developerId}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async upload(formData) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.post("assets/upload", formData, {
          contentType: "multipart/form-data",
        });
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async update(id, data) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.patch(`assets/${id}`, data);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.delete(`assets/${id}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }
}

export const assetApi = new AssetApi();
