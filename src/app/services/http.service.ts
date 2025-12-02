import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { MOCK_PATIENTS_DATA } from '../constants/mock-data.constants';
import { ListResponse, LoginCredentials, AuthResponse } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl || 'https://reqres.in/api';

  // Mock data for offline development
  private readonly mockLoginResponse: AuthResponse = {
    token: 'mock-jwt-token-12345',
    user: {
      email: 'test@example.com',
      id: 1,
      name: 'Test User'
    }
  };

  /**
   * Generic GET method
   * @param endpoint API endpoint
   * @param params Query parameters
   * @param headers Custom headers
   * @returns Observable of response
   */
  get<T>(endpoint: string, params?: any, headers?: HttpHeaders): Observable<T> {
    const options = {
      params: new HttpParams({ fromObject: params || {} }),
      headers: headers
    };

    // Check if we should use mock data for this endpoint
    if (endpoint === '/items' && !environment.production) {
      return this.getMockData<T>('items');
    }

    return this.http.get<T>(`${this.apiUrl}${endpoint}`, options).pipe(
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Generic POST method
   * @param endpoint API endpoint
   * @param body Request body
   * @param headers Custom headers
   * @returns Observable of response
   */
  post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    // Check if we should use mock data for this endpoint
    if (endpoint === '/login' && !environment.production) {
      return this.getMockData<T>('login', body);
    }

    return this.http.post<T>(`${this.apiUrl}${endpoint}`, body, { headers }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Generic PUT method
   * @param endpoint API endpoint
   * @param body Request body
   * @param headers Custom headers
   * @returns Observable of response
   */
  put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${endpoint}`, body, { headers }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Generic PATCH method
   * @param endpoint API endpoint
   * @param body Request body
   * @param headers Custom headers
   * @returns Observable of response
   */
  patch<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}${endpoint}`, body, { headers }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Generic DELETE method
   * @param endpoint API endpoint
   * @param headers Custom headers
   * @returns Observable of response
   */
  delete<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${endpoint}`, { headers }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Login method
   * @param credentials Login credentials
   * @returns Observable of AuthResponse
   */
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    // Try to use real API first
    return this.post<AuthResponse>('/login', credentials).pipe(
      catchError(error => {
        console.warn('API login failed, using mock data:', error);
        // Fall back to mock data if API fails
        return of(this.mockLoginResponse).pipe(delay(800));
      })
    );
  }

  /**
   * Get items list
   * @returns Observable of ListResponse
   */
  getItems(): Observable<ListResponse> {
    // Try to use real API first
    return this.get<ListResponse>('/items').pipe(
      catchError(error => {
        console.warn('API items fetch failed, using mock data:', error);
        // Fall back to mock data if API fails
        return of(MOCK_PATIENTS_DATA).pipe(delay(800));
      })
    );
  }

  /**
   * Get mock data for development
   * @param type Type of mock data
   * @param requestData Optional request data
   * @returns Observable of mock data
   */
  private getMockData<T>(type: string, requestData?: any): Observable<T> {
    let mockData: any;

    switch (type) {
      case 'login':
        // Validate credentials in mock login
        const credentials = requestData as LoginCredentials;
        if (credentials.email === 'test@example.com' && credentials.password === 'Test@123') {
          mockData = this.mockLoginResponse;
        } else {
          return throwError(() => ({
            status: 401,
            error: { error: 'Invalid email or password' }
          }));
        }
        break;
      case 'items':
        mockData = MOCK_PATIENTS_DATA;
        break;
      default:
        mockData = {};
    }

    // Add delay to simulate network request
    return of(mockData as T).pipe(delay(800));
  }

  /**
   * Handle HTTP errors
   * @param error HTTP error
   * @returns Observable error
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => error);
  }
}
