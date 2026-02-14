import { apiService } from "../services/api.service";

class AssetsApi {
  // Projects
  async getProjects() {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get("projects");
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getProjectAggregate(projectId) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`projects/${projectId}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getProjectsByDeveloper(developerId) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`projects/developer/${developerId}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  // Zones / Properties / Floors / Units
  async getZonesByProject(projectId) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`zones/project/${projectId}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getPropertiesByZone(zoneId) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`properties/zone/${zoneId}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getFloorsByProperty(propertyId) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`floors/property/${propertyId}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getUnitsByProperty(propertyId) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`units/property/${propertyId}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getUnitsByFloor(floorId) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`units/floor/${floorId}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getUnitByCode(unitCode) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`units/code/${unitCode}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  // Property views
  async getPropertyViews(propertyId) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`property-views/property/${propertyId}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  // Assets
  async getAssets() {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get("assets");
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getAssetsByDeveloper(developerId) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`assets/developer/${developerId}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  async getAsset(assetId) {
    return new Promise((resolve, reject) => {
      try {
        const resp = apiService.get(`assets/${assetId}`);
        resolve(resp);
      } catch (err) {
        reject(new Error("Internal server error", err));
      }
    });
  }

  getAssetFileUrl(assetId) {
    return apiService.parseEndpoint(`assets/file/${assetId}`);
  }
}

export const assetsApi = new AssetsApi();
