import "isomorphic-fetch";
import { stringify } from "querystring";
import { omit, merge, toUpper } from "lodash";

/**
 * ApiService - HTTP request wrapper with token management
 * Provides methods for GET, POST, PUT, DELETE requests with consistent
 * error handling, JSON parsing, and JWT authentication
 */
class ApiService {
  /**
   * Initialize API service with base URL
   * @param {string} url - Base API URL (e.g., "https://api.example.com")
   */
  constructor(url) {
    this.apiUrl = url; // Base API endpoint
    this.apiToken = ""; // Stores JWT token for auth
    this.options = {}; // Default request options & headers
  }

  /**
   * Store JWT token and add it to Authorization header
   * Called after successful login to include token in all future requests
   * @param {string} apiToken - JWT token from server
   */
  setToken(apiToken) {
    this.apiToken = apiToken;
    this.options.headers = {
      ...this.options.headers,
      Authorization: `Bearer ${apiToken}`, // Format: "Bearer <token>"
    };
  }

  /**
   * Remove JWT token from headers
   * Called on logout to stop sending auth in requests
   */
  unsetToken() {
    this.options.headers = {
      ...this.options.headers,
      Authorization: undefined, // Clear auth header
    };
  }

  /**
   * Format request options and headers
   * Handles JSON stringification and multipart form data
   * @param {object} config - Request configuration
   * @param {string} config.method - HTTP method (get, post, put, delete)
   * @param {*} config.data - Request body data
   * @param {string} config.contentType - Override content type (e.g., "multipart/form-data")
   * @returns {object} Formatted fetch options with method, headers, body
   */
  parseOptions({ method = "get", data, locale, ...options } = {}) {
    // Detect multipart form data (for file uploads)
    const isMultipart = options.contentType === "multipart/form-data";

    // Build default request options
    const settings = merge(
      {
        body: data ? JSON.stringify(data) : undefined, // Stringify JSON body
        method: toUpper(method), // Convert method to uppercase
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json", // Default JSON
        },
      },
      options, // Merge with custom options
    );

    // For multipart (file upload), don't stringify and remove Content-Type
    // Let browser set it with boundary automatically
    if (isMultipart) {
      settings.body = data; // Keep FormData as-is
      settings.headers = omit(settings.headers, ["Content-Type"]);
    }

    return settings;
  }

  /**
   * Build full endpoint URL with query parameters
   * @param {string} endpoint - Relative path (e.g., "/auth/login") or full URL
   * @param {object} queryParams - URL query parameters (e.g., { page: 1, limit: 10 })
   * @returns {string} Complete URL with query string
   * @example
   * parseEndpoint("/posts", { page: 1 })
   * // Returns: "https://api.example.com/posts?page=1"
   */
  parseEndpoint(endpoint, queryParams) {
    // Use full URL if provided, otherwise prepend base API URL
    const url =
      endpoint.indexOf("http") === 0 ? endpoint : `${this.apiUrl}${endpoint}`;
    // Append query string if parameters provided
    const queryString = queryParams ? `?${stringify(queryParams)}` : "";
    return `${url}${queryString}`;
  }

  /**
   * Parse response body as JSON
   * Formats readable error messages if JSON parsing fails
   * @param {Response} response - Fetch API Response object
   * @returns {Promise<object>} Parsed JSON response
   */
  convertToJson(response) {
    try {
      return response.json(); // Parse JSON from response body
    } catch (jsonError) {
      let errorMessage;
      // Build detailed error message from available info
      if (jsonError.message && jsonError.description) {
        errorMessage = `${jsonError.message}, ${jsonError.description}.`;
      } else if (jsonError.message) {
        errorMessage = `${jsonError.message}`;
      } else {
        errorMessage = `${response.status} ${response.statusText}`;
      }
      const error = new Error(errorMessage);
      throw error;
    }
  }

  /**
   * Validate HTTP response status
   * Throws error for non-2xx status codes with formatted error messages
   * @param {Response} response - Fetch API Response object
   * @returns {Promise<Response>} Resolves if response.ok, rejects with error
   * @throws {Error} Formatted error from server or HTTP status
   */
  checkStatus(response) {
    return new Promise((resolve, reject) => {
      // Success: status 200-299
      if (response.ok) return resolve(response);

      // Error: status 4xx or 5xx - try to extract error message from response
      response
        .json()
        .then((jsonError) => {
          let errorMessage;
          // Build detailed error message from server response
          if (jsonError.message && jsonError.description) {
            errorMessage = `${jsonError.message}, ${jsonError.description}.`;
          } else if (jsonError.message) {
            errorMessage = `${jsonError.message}`;
          } else {
            errorMessage = `${response.status} ${response.statusText}`;
          }
          jsonError.message = errorMessage;
          reject(jsonError);
        })
        .catch(() => {
          // Fallback if response body is not JSON
          const error = new Error(`${response.status} ${response.statusText}`);
          reject(error);
        });
    });
  }

  /**
   * Execute fetch request with error handling and JSON parsing
   * @param {string} endpointUrl - Full URL to request
   * @param {object} options - Fetch options (method, headers, body, etc.)
   * @returns {Promise<object>} Parsed JSON response data
   * @private
   */
  async request(endpointUrl, options = {}) {
    return fetch(endpointUrl, {
      ...options,
      headers: {
        ...options.headers,
        accept: "application/json",
        Authorization: `Bearer ${this.apiToken}`,
      },
    })
      .then(this.checkStatus.bind(this)) // Validate HTTP status (2xx vs 4xx/5xx)
      .then(this.convertToJson.bind(this)); // Parse response as JSON
  }

  /**
   * GET request (fetch data)
   * @param {string} endpoint - Relative path or full URL
   * @param {object} queryParams - Query parameters (e.g., { page: 1, search: "term" })
   * @param {object} options - Additional fetch options (headers, etc.)
   * @returns {Promise<object>} Response data
   * @example
   * apiService.get("/posts", { page: 1 })
   */
  async get(endpoint, queryParams, options) {
    console.log("token", this.apiToken);
    const url = this.parseEndpoint(endpoint, queryParams);
    const parsedOptions = this.parseOptions({
      method: "get",
      ...options,
    });
    return this.request(url, parsedOptions);
  }

  /**
   * POST request (create new data)
   * @param {string} endpoint - Relative path or full URL
   * @param {*} data - Request body (object, FormData, etc.)
   * @param {object} options - Additional fetch options
   * @returns {Promise<object>} Response data
   * @example
   * apiService.post("/auth/login", { email: "user@example.com", password: "pass" })
   */
  async post(endpoint, data, options) {
    const url = this.parseEndpoint(endpoint);
    const parsedOptions = this.parseOptions({
      method: "post",
      data,
      ...options,
    });
    return this.request(url, parsedOptions);
  }

  /**
   * PUT request (update existing data)
   * @param {string} endpoint - Relative path or full URL
   * @param {*} data - Request body (object, FormData, etc.)
   * @param {object} options - Additional fetch options
   * @returns {Promise<object>} Response data
   * @example
   * apiService.put("/users/123", { name: "John", email: "john@example.com" })
   */
  async put(endpoint, data, options) {
    const url = this.parseEndpoint(endpoint);
    const parsedOptions = this.parseOptions({
      method: "put",
      data,
      ...options,
    });
    return this.request(url, parsedOptions);
  }

  async patch(endpoint, data, options) {
    const url = this.parseEndpoint(endpoint);
    const parsedOptions = this.parseOptions({
      method: "patch",
      data,
      ...options,
    });
    return this.request(url, parsedOptions);
  }

  /**
   * DELETE request (remove data)
   * @param {string} endpoint - Relative path or full URL
   * @param {*} data - Request body (optional, some APIs require it)
   * @param {object} options - Additional fetch options
   * @returns {Promise<object>} Response data
   * @example
   * apiService.delete("/posts/123")
   */
  async delete(endpoint, data, options) {
    const url = this.parseEndpoint(endpoint);
    const parsedOptions = this.parseOptions({
      method: "delete",
      data,
      ...options,
    });
    return this.request(url, parsedOptions);
  }
}

// Create singleton instance with base URL from config
// Note: Set VITE_API_URL in .env file
// Example: VITE_API_URL=https://api.example.com
export const apiService = new ApiService(
  import.meta.env.VITE_API_URL || "http://localhost:3000",
);

export default ApiService;
