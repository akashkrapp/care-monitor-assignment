/**
 * List related constants
 */
import { ErrorMessages, SuccessMessages, ApiEndpoints } from '../models/enums';

/**
 * API configuration for list
 */
export const LIST_API_CONFIG = {
  ENDPOINT: ApiEndpoints.USERS,
  PAGE: 1,
  PER_PAGE: 12
} as const;

/**
 * Error messages for list
 */
export const LIST_ERROR_MESSAGES = {
  LOAD_FAILED: ErrorMessages.LOAD_ITEMS_FAILED,
  NETWORK_ERROR: ErrorMessages.NETWORK_ERROR,
  SERVER_ERROR: ErrorMessages.SERVER_ERROR
} as const;

/**
 * Success messages for list
 */
export const LIST_SUCCESS_MESSAGES = {
  ITEMS_LOADED: SuccessMessages.ITEMS_LOADED
} as const;

/**
 * Snackbar configuration for list
 */
export const LIST_SNACKBAR_CONFIG = {
  SUCCESS_DURATION: 2000,
  ERROR_DURATION: 3000
} as const;

