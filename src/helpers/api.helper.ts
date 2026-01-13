/**
 * Utilitaires pour les tests API
 */
export class APIHelper {
  private readonly apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  /**
   * Effectue une requête GET
   */
  async get(endpoint: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`GET ${endpoint} failed with status ${response.status}`);
    }
    return response.json();
  }

  /**
   * Effectue une requête POST
   */
  async post(endpoint: string, data: any): Promise<any> {
    const response = await fetch(`${this.apiUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`POST ${endpoint} failed with status ${response.status}`);
    }
    return response.json();
  }

  /**
   * Effectue une requête PUT
   */
  async put(endpoint: string, data: any): Promise<any> {
    const response = await fetch(`${this.apiUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`PUT ${endpoint} failed with status ${response.status}`);
    }
    return response.json();
  }

  /**
   * Effectue une requête DELETE
   */
  async delete(endpoint: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}${endpoint}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`DELETE ${endpoint} failed with status ${response.status}`);
    }
    return response.json();
  }
}
