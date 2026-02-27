import { apiService } from "../../services/api.service";

/**
 * Unit Type API – matches 3D-Simulation-RealEstate-Backend unit-type.controller.ts
 * Base path: /unit-types
 */
class UnitTypeApi {
  /**
   * Get all unit types (supports pagination query: page, limit).
   * Backend returns PaginatedResponseDto { data, meta }.
   */
  async getAll(params = {}) {
    const res = await apiService.get("unit-types", params);
    if (res && Array.isArray(res.data)) return res.data;
    return Array.isArray(res) ? res : [];
  }

  /**
   * Get unit types scoped to a project.
   * Frontend-only contract for now; backend should support ?projectId=... filter.
   */
  async getByProject(projectId, params = {}) {
    const query = { ...(params || {}), projectId };
    const res = await apiService.get("unit-types", query);
    const data = res?.data ?? res;
    if (Array.isArray(data)) return data;
    return Array.isArray(res) ? res : [];
  }

  async getById(id) {
    return apiService.get(`unit-types/${id}`);
  }

  async create(data) {
    return apiService.post("unit-types", data);
  }

  /**
   * Create unit type with full hierarchy (levels, rooms, hotspots).
   */
  async createFull(data) {
    return apiService.post("unit-types/full", data);
  }

  async update(id, data) {
    return apiService.patch(`unit-types/${id}`, data);
  }

  async delete(id) {
    return apiService.delete(`unit-types/${id}`);
  }

  async findByName(name) {
    const res = await apiService.get(
      `unit-types/search/name/${encodeURIComponent(name)}`,
    );
    return Array.isArray(res) ? res : [];
  }

  async findByBedrooms(bedrooms) {
    const res = await apiService.get(`unit-types/search/bedrooms/${bedrooms}`);
    return Array.isArray(res) ? res : [];
  }

  async findByBathrooms(bathrooms) {
    const res = await apiService.get(
      `unit-types/search/bathrooms/${bathrooms}`,
    );
    return Array.isArray(res) ? res : [];
  }
}

export const unitTypeApi = new UnitTypeApi();
