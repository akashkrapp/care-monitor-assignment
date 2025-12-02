import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './list.component';
import { AuthService } from '../../services/auth.service';
import { ListService } from '../../services/list.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { of, throwError } from 'rxjs';
import { signal } from '@angular/core';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let listService: jasmine.SpyObj<ListService>;
  let router: jasmine.SpyObj<Router>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  const mockAuthService = jasmine.createSpyObj('AuthService', ['logout']);
  const mockListService = jasmine.createSpyObj('ListService', ['fetchItems'], {
    items: signal([]),
    loading: signal(false),
    error: signal(null)
  });
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent, BrowserAnimationsModule],
      providers: [
        provideZonelessChangeDetection(),
        { provide: AuthService, useValue: mockAuthService },
        { provide: ListService, useValue: mockListService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    listService = TestBed.inject(ListService) as jasmine.SpyObj<ListService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have items, loading, and error from listService', () => {
    expect(component.items).toBeDefined();
    expect(component.isLoading).toBeDefined();
    expect(component.error).toBeDefined();
  });

  it('should call fetchItems on ngOnInit', () => {
    listService.fetchItems.and.returnValue(of({ data: [], page: 1, per_page: 12, total: 0, total_pages: 0 }));

    component.ngOnInit();

    expect(listService.fetchItems).toHaveBeenCalled();
  });

  it('should show success snackbar when items are loaded', () => {
    const mockItems = [
      { id: 1, name: 'Test User', email: 'test@example.com' }
    ];
    listService.items = signal(mockItems);
    listService.fetchItems.and.returnValue(of({ data: mockItems, page: 1, per_page: 12, total: 1, total_pages: 1 }));

    component.loadItems();

    expect(snackBar.open).toHaveBeenCalledWith(
      'Items loaded successfully!',
      'Close',
      jasmine.objectContaining({
        duration: 2000
      })
    );
  });

  it('should show error snackbar on fetch error', () => {
    listService.fetchItems.and.returnValue(throwError(() => ({ error: 'Error' })));

    component.loadItems();

    expect(snackBar.open).toHaveBeenCalledWith(
      'Failed to load items. Please try again.',
      'Close',
      jasmine.objectContaining({
        duration: 3000
      })
    );
  });

  it('should call loadItems when onRetry is called', () => {
    spyOn(component, 'loadItems');
    component.onRetry();

    expect(component.loadItems).toHaveBeenCalled();
  });

  it('should call authService.logout when onLogout is called', () => {
    component.onLogout();

    expect(authService.logout).toHaveBeenCalled();
  });

  it('should display loading state', () => {
    listService.loading = signal(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const spinner = compiled.querySelector('mat-spinner');

    expect(spinner).toBeTruthy();
  });

  it('should display error state', () => {
    listService.error = signal('Test error');
    listService.loading = signal(false);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const errorContainer = compiled.querySelector('.error-container');

    expect(errorContainer).toBeTruthy();
  });

  it('should display empty state when no items', () => {
    listService.items = signal([]);
    listService.loading = signal(false);
    listService.error = signal(null);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const emptyContainer = compiled.querySelector('.empty-container');

    expect(emptyContainer).toBeTruthy();
  });

  it('should display items when loaded', () => {
    const mockItems = [
      { id: 1, name: 'Test User', email: 'test@example.com', description: 'Test description' }
    ];
    listService.items = signal(mockItems);
    listService.loading = signal(false);
    listService.error = signal(null);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const listItems = compiled.querySelectorAll('mat-list-item');

    expect(listItems.length).toBeGreaterThan(0);
  });
});

