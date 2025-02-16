import { API_URL } from "@constants/Constants";
import { HttpMethod } from "./HttpMethod";

/**
 * Makes a generic HTTP request to the specified endpoint with the given parameters.
 *
 * This function is designed to handle various types of HTTP requests such as GET, POST, PUT, and DELETE,
 * by providing appropriate request options and headers. It also supports Bearer token authorization if provided.
 *
 * @param {string} endpoint - The endpoint of the API to which the request will be made.
 * @param {object|null} body - The body of the request, which will be stringified into JSON format.
 *                             It is typically used for POST, PUT, or DELETE requests. Defaults to null.
 * @param {string} [method=HttpMethod.POST] - The HTTP method to be used for the request. Default is POST.
 * @param {string|null} [token=null] - Optional Bearer token for authentication. Defaults to null.
 *
 * @returns {Promise<Object>} - A promise that resolves to an object containing the response data or error details.
 *                               The object has the following structure:
 *                               - `success`: Boolean indicating whether the request was successful or not.
 *                               - `data`: The response data from the server if the request was successful.
 *                               - `error`: The error message if the request failed.
 *
 * @throws {Error} - Throws an error if there is an issue making the request (e.g., network failure).
 */
export const apiGenericRequest = async (endpoint, body, method = HttpMethod.POST, token = null) => {

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const options = {
      method: method,
      headers: headers,
    };
    if (body && method !== HttpMethod.GET) {
      options.body = JSON.stringify(body);
    }
    const response = await fetch(`${API_URL}/${endpoint}`, options);
    if (!response.ok) {
      console.error(`Error in request: ${response.status} ${response.statusText} ${token}`);
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("lastVisitDate");
        localStorage.removeItem("inspiringPhraseVisible");
      }
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: "Unknown error from server" };
      }
      return { success: false, error: errorData };
    }
    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    }
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error.message);
    return { success: false, error: error.message };
  }
};

export const apiGetGenres = () => apiGenericRequest("genre/get", null, HttpMethod.POST);
export const apiGetCivilStatus = () => apiGenericRequest("civil_status/get", null, HttpMethod.POST);
export const apiGetEmployment = () => apiGenericRequest("employment/get", null, HttpMethod.POST);
export const apiGetCategory = () => apiGenericRequest("category/get", null, HttpMethod.POST);
export const apiGetInspiringPhrases = () => apiGenericRequest("inspiring_phrase/get", null, HttpMethod.POST);
