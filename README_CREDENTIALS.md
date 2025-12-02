# Test Credentials

## Hardcoded Test Credentials

For testing purposes, the application uses hardcoded credentials:

- **Email**: `test@example.com`
- **Password**: `Test@123`

## How It Works

1. The application checks these credentials first (when `API_CONFIG.USE_MOCK_AUTH` is `true`)
2. If credentials match, a dummy token is generated and stored
3. The user is authenticated and redirected to the dashboard
4. The API code is still present but bypassed for testing

## Switching to Real API

To use the real API instead of hardcoded credentials:

1. Open `src/app/constants/auth.constants.ts`
2. Change `USE_MOCK_AUTH` to `false`:
   ```typescript
   export const API_CONFIG = {
     USE_MOCK_AUTH: false, // Set to false to use real API
     USE_MOCK_LIST: false
   } as const;
   ```

## Token Generation

When using hardcoded credentials, a random dummy token is generated using:
- Current timestamp
- Random string
- Format: `dummy_token_{timestamp}_{randomString}`

This token is stored in cookies just like a real API token would be.

