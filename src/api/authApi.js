import { apiService } from "../services/api.service";

class AuthApi {
  async login({ email, password }) {
    return new Promise((resolve, reject) => {
      try {
        const user = apiService.post("auth/login", {
          email,
          password,
        });
        resolve(user);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async logout() {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get("auth/logout", {});
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async changePassword({ id, newPassword, confirmNewPassword }) {
    return new Promise((resolve, reject) => {
      try {
        const user = apiService.put("auth/change-password", {
          id,
          newPassword,
          confirmNewPassword,
        });
        resolve(user);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }
}

export const authApi = new AuthApi();
