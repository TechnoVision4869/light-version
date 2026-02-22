import { apiService } from "../../services/api.service";

/** Strip nested relations so admin state and form use flat amenity data only. */
function normalizeAmenityItem(item) {
  if (!item || typeof item !== "object") return item;
  const {
    project,
    thumbnailAsset,
    forwardAsset,
    reverseAsset,
    sideAsset,
    ...flat
  } = item;
  return flat;
}

class AmenityApi {
  async getAll(projectId) {
    try {
      const query = projectId ? { projectId } : undefined;
      const res = await apiService.get("amenities", query);
      const list = res && Array.isArray(res.data) ? res.data : Array.isArray(res) ? res : [];
      return list.map(normalizeAmenityItem);
    } catch (err) {
      throw new Error(err?.message || "Failed to load amenities");
    }
  }

  async getById(id) {
    const res = await apiService.get(`amenities/${id}`);
    return normalizeAmenityItem(res);
  }

  async create(data) {
    return apiService.post("amenities", data);
  }

  async update(id, data) {
    return apiService.patch(`amenities/${id}`, data);
  }

  async delete(id) {
    return apiService.delete(`amenities/${id}`);
  }
}

export const amenityApi = new AmenityApi();
