import { apiService } from "../../services/api.service";

class PropertyApi {
  async getAll() {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get("properties");
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`properties/${id}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getByZone(zoneId) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`properties/zone/${zoneId}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async create(data) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.post("properties", data);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async update(id, data) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.patch(`properties/${id}`, data);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.delete(`properties/${id}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }
}

export const propertyApi = new PropertyApi();
