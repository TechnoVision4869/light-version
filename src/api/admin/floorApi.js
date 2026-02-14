import { apiService } from "../../services/api.service";

class FloorApi {
  async getAll() {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get("floors");
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`floors/${id}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getByProperty(propertyId) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`floors/property/${propertyId}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async create(data) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.post("floors", data);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async update(id, data) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.patch(`floors/${id}`, data);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.delete(`floors/${id}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }
}

export const floorApi = new FloorApi();
