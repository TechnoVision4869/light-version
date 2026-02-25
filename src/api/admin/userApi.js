import { apiService } from "../../services/api.service";

class UserApi {
  async getAll() {
    return apiService.get("users");
  }

  async create(data) {
    return apiService.post("users", data);
  }

  async getById(id) {
    return apiService.get(`users/${id}`);
  }

  async update(id, data) {
    return apiService.patch(`users/${id}`, data);
  }

  async delete(id) {
    return apiService.delete(`users/${id}`, null);
  }

  async getUsersByDevId(devId) {
    return apiService.get(`users/developer/${devId}`);
  }
}

export const userApi = new UserApi();
