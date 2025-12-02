import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ListService, ListResponse, ListItem } from './list.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ListService', () => {
  let service: ListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ListService, provideZonelessChangeDetection()]
    });

    service = TestBed.inject(ListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initial state', () => {
    it('should have empty initial state', () => {
      expect(service.items()).toEqual([]);
      expect(service.loading()).toBe(false);
      expect(service.error()).toBeNull();
    });
  });

  describe('fetchItems', () => {
    const mockResponse: ListResponse = {
      data: [
        {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
          avatar: 'https://example.com/avatar1.jpg'
        },
        {
          id: 2,
          first_name: 'Jane',
          last_name: 'Smith',
          email: 'jane.smith@example.com',
          avatar: 'https://example.com/avatar2.jpg'
        }
      ],
      page: 1,
      per_page: 12,
      total: 2,
      total_pages: 1
    };

    it('should fetch items successfully', (done) => {
      service.fetchItems().subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
          expect(service.items().length).toBe(2);
          expect(service.items()[0].name).toBe('John Doe');
          expect(service.items()[0].email).toBe('john.doe@example.com');
          expect(service.loading()).toBe(false);
          expect(service.error()).toBeNull();
          done();
        }
      });

      const req = httpMock.expectOne('https://reqres.in/api/users?page=1&per_page=12');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should set loading to true when fetching', () => {
      service.fetchItems().subscribe();

      expect(service.loading()).toBe(true);

      const req = httpMock.expectOne('https://reqres.in/api/users?page=1&per_page=12');
      req.flush(mockResponse);
    });

    it('should handle items without first_name or last_name', (done) => {
      const responseWithMissingNames: ListResponse = {
        ...mockResponse,
        data: [
          {
            id: 3,
            email: 'test@example.com',
            avatar: 'https://example.com/avatar3.jpg'
          } as any
        ]
      };

      service.fetchItems().subscribe({
        next: () => {
          expect(service.items()[0].name).toBe('User 3');
          done();
        }
      });

      const req = httpMock.expectOne('https://reqres.in/api/users?page=1&per_page=12');
      req.flush(responseWithMissingNames);
    });

    it('should handle API error', (done) => {
      const errorResponse = {
        error: { error: 'Server error' }
      };

      service.fetchItems().subscribe({
        next: () => fail('should have failed'),
        error: () => {
          expect(service.loading()).toBe(false);
          expect(service.error()).toBe('Server error');
          expect(service.items()).toEqual([]);
          done();
        }
      });

      const req = httpMock.expectOne('https://reqres.in/api/users?page=1&per_page=12');
      req.flush(errorResponse, { status: 500, statusText: 'Internal Server Error' });
    });

    it('should handle network error', (done) => {
      service.fetchItems().subscribe({
        next: () => fail('should have failed'),
        error: () => {
          expect(service.loading()).toBe(false);
          expect(service.error()).toBe('Failed to load items. Please try again.');
          done();
        }
      });

      const req = httpMock.expectOne('https://reqres.in/api/users?page=1&per_page=12');
      req.error(new ProgressEvent('Network error'));
    });
  });

  describe('reset', () => {
    it('should reset state to initial values', () => {
      // First fetch some items
      service.fetchItems().subscribe();
      const req = httpMock.expectOne('https://reqres.in/api/users?page=1&per_page=12');
      req.flush({
        data: [{ id: 1, first_name: 'Test', last_name: 'User', email: 'test@example.com' }],
        page: 1,
        per_page: 12,
        total: 1,
        total_pages: 1
      });

      // Reset
      service.reset();

      expect(service.items()).toEqual([]);
      expect(service.loading()).toBe(false);
      expect(service.error()).toBeNull();
    });
  });

  describe('computed signals', () => {
    it('should provide computed items signal', () => {
      service.fetchItems().subscribe();
      const req = httpMock.expectOne('https://reqres.in/api/users?page=1&per_page=12');
      req.flush({
        data: [{ id: 1, first_name: 'Test', last_name: 'User', email: 'test@example.com' }],
        page: 1,
        per_page: 12,
        total: 1,
        total_pages: 1
      });

      expect(service.items().length).toBe(1);
    });

    it('should provide computed loading signal', () => {
      service.fetchItems().subscribe();
      expect(service.loading()).toBe(true);
    });

    it('should provide computed error signal', () => {
      service.fetchItems().subscribe({
        error: () => {}
      });
      const req = httpMock.expectOne('https://reqres.in/api/users?page=1&per_page=12');
      req.flush({ error: 'Error' }, { status: 500, statusText: 'Error' });

      expect(service.error()).toBeTruthy();
    });
  });
});

