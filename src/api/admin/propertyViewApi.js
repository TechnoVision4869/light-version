import { apiService } from "../../services/api.service";

class PropertyViewApi {
  async getAll() {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get("property-views");
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`property-views/${id}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getByProperty(propertyId) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`property-views/property/${propertyId}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async create(data) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.post("property-views", data);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async update(id, data) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.patch(`property-views/${id}`, data);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.delete(`property-views/${id}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }
}

export const propertyViewApi = new PropertyViewApi();
