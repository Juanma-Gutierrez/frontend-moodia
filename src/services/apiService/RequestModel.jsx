export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export class ApiRequest {
  constructor(endpoint, method, body = '', token = '') {
    this.endpoint = endpoint;
    this.method = method;
    this.body = body;
    this.token = token;
  }
}
