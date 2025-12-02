/**
 * Mock API endpoints and documentation
 */

/**
 * Available Mock API Endpoints
 *
 * 1. Login API (POST /api/login)
 *    Request body: { email: string, password: string }
 *    Response: { token: string, user: { email: string, id: number, name: string } }
 *    Status: 200 OK on success, 401 Unauthorized on failure
 *    Mock credentials: email: "test@example.com", password: "Test@123"
 *
 * 2. List API (GET /api/items)
 *    Response: {
 *      page: number,
 *      per_page: number,
 *      total: number,
 *      total_pages: number,
 *      data: [{ id: number, name: string, description: string, ... }]
 *    }
 *    Status: 200 OK
 *
 * 3. Patient Details API (GET /api/patients/:id)
 *    Response: {
 *      id: number,
 *      name: string,
 *      email: string,
 *      medical_conditions: string[],
 *      medications: { name: string, dosage: string, frequency: string }[],
 *      ...
 *    }
 *    Status: 200 OK, 404 Not Found if patient doesn't exist
 */

export const MOCK_API_ENDPOINTS = {
  LOGIN: '/api/login',
  ITEMS: '/api/items',
  PATIENT_DETAILS: '/api/patients/:id'
};

/**
 * Mock API response status codes
 */
export const MOCK_API_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

/**
 * Mock API error messages
 */
export const MOCK_API_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  UNAUTHORIZED: 'Unauthorized access',
  NOT_FOUND: 'Resource not found',
  SERVER_ERROR: 'Server error occurred'
};

/**
 * Mock API success messages
 */
export const MOCK_API_SUCCESS = {
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  ITEMS_LOADED: 'Items loaded successfully'
};
