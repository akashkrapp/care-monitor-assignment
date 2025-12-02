/**
 * Authentication related interfaces
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user?: UserInfo;
}

export interface UserInfo {
  email: string;
  name?: string;
  id?: number;
}

/**
 * List related interfaces
 */
export interface ListItem {
  id: number;
  name: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  description?: string;
}

export interface ListResponse {
  data: ListItem[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface ListState {
  items: ListItem[];
  loading: boolean;
  error: string | null;
}

/**
 * API Error interfaces
 */
export interface ApiError {
  error: string | ApiErrorDetail;
  message?: string;
  status?: number;
}

export interface ApiErrorDetail {
  error?: string;
  message?: string;
}

/**
 * Cookie configuration interface
 */
export interface CookieConfig {
  key: string;
  value: string;
  expiryDays: number;
  path: string;
  domain: string;
  secure: boolean;
  sameSite: 'Strict' | 'Lax' | 'None';
}

/**
 * Snackbar configuration interface
 */
export interface SnackbarConfig {
  message: string;
  action: string;
  duration: number;
  horizontalPosition: 'start' | 'center' | 'end' | 'left' | 'right';
  verticalPosition: 'top' | 'bottom';
}

/**
 * Form validation error interface
 */
export interface FormValidationError {
  field: string;
  message: string;
}

