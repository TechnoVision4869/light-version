import { apiService } from "../../services/api.service";

class SurroundingApi {
  async getAll() {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get("surroundings");
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`surroundings/${id}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getByProject(projectId) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`surroundings/project/${projectId}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async create(data) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.post("surroundings", data);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async update(id, data) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.patch(`surroundings/${id}`, data);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.delete(`surroundings/${id}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }
}

export const surroundingApi = new SurroundingApi();
