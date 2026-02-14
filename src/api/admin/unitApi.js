import { apiService } from "../../services/api.service";

class UnitApi {
  async getAll() {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get("units");
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`units/${id}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getByProperty(propertyId) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`units/property/${propertyId}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getByFloor(floorId) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`units/floor/${floorId}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getByCode(unitCode) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`units/code/${unitCode}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async create(data) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.post("units", data);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async update(id, data) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.patch(`units/${id}`, data);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.delete(`units/${id}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }
}

export const unitApi = new UnitApi();
