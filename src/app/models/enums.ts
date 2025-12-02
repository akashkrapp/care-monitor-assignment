/**
 * Application enums for constants
 */

/**
 * Cookie keys enum
 */
export enum CookieKeys {
  AUTH_TOKEN = 'auth_token',
  USER_EMAIL = 'user_email'
}

/**
 * Route paths enum
 */
export enum RoutePaths {
  LOGIN = '/login',
  DASHBOARD = '/dashboard',
  LIST = '/list',
  ROOT = '/'
}

/**
 * API endpoints enum
 */
export enum ApiEndpoints {
  LOGIN = 'https://reqres.in/api/login',
  USERS = 'https://reqres.in/api/users'
}

/**
 * Cookie configuration enum
 */
export enum CookieConfig {
  EXPIRY_DAYS = 7,
  PATH = '/',
  DOMAIN = ''
}

/**
 * Cookie security constants
 */
export const COOKIE_SECURE = true;
export const COOKIE_SAME_SITE = 'Strict';

/**
 * Form validation messages enum
 */
export enum ValidationMessages {
  EMAIL_REQUIRED = 'Email is required',
  EMAIL_INVALID = 'Please enter a valid email',
  PASSWORD_REQUIRED = 'Password is required',
  PASSWORD_MIN_LENGTH = 'Password must be at least 6 characters'
}

/**
 * Error messages enum
 */
export enum ErrorMessages {
  LOGIN_FAILED = 'Login failed. Please try again.',
  INVALID_CREDENTIALS = 'Invalid email or password',
  LOAD_ITEMS_FAILED = 'Failed to load items. Please try again.',
  NETWORK_ERROR = 'Network error. Please check your connection.',
  SERVER_ERROR = 'Server error. Please try again later.'
}

/**
 * Success messages enum
 */
export enum SuccessMessages {
  LOGIN_SUCCESS = 'Login successful!',
  ITEMS_LOADED = 'Items loaded successfully!'
}

/**
 * Snackbar actions enum
 */
export enum SnackbarActions {
  CLOSE = 'Close'
}

/**
 * Password validation enum
 */
export enum PasswordValidation {
  MIN_LENGTH = 6
}

