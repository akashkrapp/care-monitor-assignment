import { Injectable, signal, inject, computed } from '@angular/core';
import { Observable, catchError, throwError, finalize, map } from 'rxjs';
import { HttpService } from './http.service';
import {
  ListItem,
  ListResponse,
  ListState,
  ApiError,
  ApiErrorDetail
} from '../models/interfaces';
import { ApiEndpoints } from '../models/enums';
import {
  LIST_API_CONFIG,
  LIST_ERROR_MESSAGES
} from '../constants/list.constants';
import { MOCK_PATIENTS_DATA } from '../constants/mock-data.constants';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private readonly httpService = inject(HttpService);

  // Signal Store - State management using signals
  private readonly _state = signal<ListState>({
    items: [],
    loading: false,
    error: null
  });

  // Public readonly signals for components
  readonly state = this._state.asReadonly();
  readonly items = computed(() => this._state().items);
  readonly loading = computed(() => this._state().loading);
  readonly error = computed(() => this._state().error);

  /**
   * Fetch list of items from API
   */
  fetchItems(): Observable<ListResponse> {
    // Update state to loading
    this._state.update(state => ({
      ...state,
      loading: true,
      error: null
    }));

    // Use HttpService which handles both real API and mock data
    return this.httpService.getItems().pipe(
      map((response: ListResponse) => {
        // Transform API response to our ListItem format
        const items: ListItem[] = response.data.map((item: ListItem) => {
          const firstName: string = item.first_name || '';
          const lastName: string = item.last_name || '';
          const fullName: string = `${firstName} ${lastName}`.trim() || `User ${item.id}`;
          const email: string = item.email || 'No email';

          return {
            id: item.id,
            name: fullName,
            email: item.email,
            first_name: item.first_name,
            last_name: item.last_name,
            avatar: item.avatar,
            description: `User ID: ${item.id} - ${email}`
          };
        });

        // Update state with success
        this._state.update((state: ListState) => ({
          ...state,
          items,
          error: null
        }));

        return response;
      }),
      catchError((err: unknown) => {
        const errorMessage: string = this.extractErrorMessage(err) || LIST_ERROR_MESSAGES.LOAD_FAILED;

        // Update state with error
        this._state.update((state: ListState) => ({
          ...state,
          error: errorMessage
        }));

        return throwError(() => err);
      }),
      finalize(() => {
        this._state.update((state: ListState) => ({
          ...state,
          loading: false
        }));
      })
    );
  }

  /**
   * Reset the state
   */
  reset(): void {
    this._state.set({
      items: [],
      loading: false,
      error: null
    });
  }

  /**
   * Extract error message from error object
   */
  private extractErrorMessage(error: unknown): string | null {
    if (error && typeof error === 'object' && 'error' in error) {
      const err: ApiError = error as ApiError;
      if (typeof err.error === 'string') {
        return err.error;
      }
      if (err.error && typeof err.error === 'object') {
        const errorDetail: ApiErrorDetail = err.error as ApiErrorDetail;
        return errorDetail.error || errorDetail.message || null;
      }
    }
    return null;
  }
}

