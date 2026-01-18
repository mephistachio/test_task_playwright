import { API_CONFIG } from '../config/api.config.js';

export class ApiHelpers {
  constructor(request, baseUrl = API_CONFIG.BASE_URL) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async createPet(petData) {
    const response = await this.request.post(`${this.baseUrl}/pet`, {
      data: petData,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  }

  async getPet(petId) {
    const response = await this.request.get(`${this.baseUrl}/pet/${petId}`);
    return response;
  }

  async updatePet(petData) {
    const response = await this.request.put(`${this.baseUrl}/pet`, {
      data: petData,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  }

  async deletePet(petId, apiKey = API_CONFIG.DEFAULT_API_KEY) {
    const response = await this.request.delete(`${this.baseUrl}/pet/${petId}`, {
      headers: {
        'api_key': apiKey
      }
    });
    return response;
  }

  async getPetsByStatus(status) {
    const response = await this.request.get(`${this.baseUrl}/pet/findByStatus`, {
      params: { status }
    });
    return response;
  }
}
