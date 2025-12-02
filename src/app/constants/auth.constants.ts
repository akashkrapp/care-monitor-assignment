/**
 * Authentication constants
 */
import { LoginCredentials, UserInfo } from '../models/interfaces';
import { CookieKeys, CookieConfig, ErrorMessages, SuccessMessages, COOKIE_SECURE, COOKIE_SAME_SITE } from '../models/enums';

/**
 * Hardcoded test credentials
 */
export const TEST_CREDENTIALS: LoginCredentials = {
  email: 'test@example.com',
  password: 'Test@123'
};

/**
 * Generate random token for testing
 */
export function generateDummyToken(): string {
  return `dummy_token_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Get test user info
 */
export function getTestUserInfo(email: string): UserInfo {
  return {
    email: email,
    name: 'Test User'
  };
}

/**
 * Cookie configuration constants
 */
export const AUTH_COOKIE_CONFIG = {
  TOKEN_KEY: CookieKeys.AUTH_TOKEN,
  USER_EMAIL_KEY: CookieKeys.USER_EMAIL,
  EXPIRY_DAYS: CookieConfig.EXPIRY_DAYS,
  PATH: CookieConfig.PATH,
  DOMAIN: CookieConfig.DOMAIN,
  SECURE: COOKIE_SECURE,
  SAME_SITE: COOKIE_SAME_SITE as 'Strict' | 'Lax' | 'None'
} as const;

/**
 * API configuration
 */
export const API_CONFIG = {
  USE_MOCK_AUTH: true, // Set to false to use real API
  USE_MOCK_LIST: false // Set to false to use real API
} as const;

/**
 * Error messages
 */
export const AUTH_ERROR_MESSAGES = {
  LOGIN_FAILED: ErrorMessages.LOGIN_FAILED,
  INVALID_CREDENTIALS: ErrorMessages.INVALID_CREDENTIALS
} as const;

/**
 * Success messages
 */
export const AUTH_SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: SuccessMessages.LOGIN_SUCCESS
} as const;

