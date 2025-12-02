# Care Monitor - Angular Application

## Overview
This is an Angular application for Care Monitor that implements a healthcare monitoring system with authentication, dashboard, and list views. The application demonstrates Angular best practices including signal-based state management, cookie-based authentication, and lazy loading.

## Features
- **Login Page**: Email and password authentication with form validation
- **Authentication**: Cookie-based authentication with route protection and HTTP interceptor
- **Dashboard**: Welcome page with user information and health metrics visualization
- **List Page**: Displays data from an API with loading, error, and empty states
- **HTTP Interceptor**: Automatically adds authentication tokens to requests
- **Mock API Integration**: Supports both real API and mock data

## Tech Stack
- **Angular**: v20+ (Latest version)
- **Angular Material**: UI component library
- **Signal Store**: For state management
- **ngx-cookie-service**: For cookie-based authentication
- **RxJS**: For reactive programming and API calls
- **HTTP Interceptors**: For request/response handling and authentication
- **Environment Configuration**: For managing API endpoints across environments

## Project Structure
```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/     # Dashboard component
│   │   ├── list/          # List component
│   │   └── login/         # Login component
│   ├── constants/         # Application constants
│   ├── guards/            # Route guards for authentication
│   ├── models/            # Interfaces and enums
│   ├── services/          # Services for auth and API calls
│   ├── app.config.ts      # App configuration
│   ├── app.html           # App template
│   ├── app.routes.ts      # Route configuration
│   ├── app.scss           # App styles
│   └── app.ts             # App component
├── assets/                # Static assets
├── index.html             # Main HTML file
└── styles.scss            # Global styles
```

## Authentication
The application uses cookie-based authentication with the following test credentials:
- **Email**: `test@example.com`
- **Password**: `Test@123`

Authentication is handled by the `AuthService` which:
1. Validates credentials
2. Stores authentication token in cookies
3. Manages user session
4. Protects routes via `authGuard`

## State Management
The application uses Angular's Signal API for state management:
- **AuthService**: Manages authentication state with signals for isAuthenticated, isLoading, error, and currentUser
- **ListService**: Manages list data state with loading, error handling, and items

## API Integration
The application integrates with the following APIs:
- **Login API**: `https://reqres.in/api/login`
- **List API**: `https://reqres.in/api/users`

Currently, the application uses mock authentication but can be configured to use real API endpoints by changing the `USE_MOCK_AUTH` flag in `auth.constants.ts`.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Third-Party Libraries
- **@angular/material**: UI components for a consistent and modern look
- **ngx-cookie-service**: Cookie management for authentication
- **rxjs**: Reactive programming for handling asynchronous operations

## Features Implemented
- ✅ Login Page with form validation
- ✅ Cookie-based authentication
- ✅ Protected routes
- ✅ Dashboard with user information
- ✅ List page with API integration
- ✅ Signal Store for state management
- ✅ Lazy loading for all routes
- ✅ Loading states and error handling
- ✅ Logout functionality
- ✅ HTTP Interceptor for authentication
- ✅ Centralized HTTP service
- ✅ Mock API integration

## Additional Notes
- The application uses a mock authentication system for demonstration purposes
- API endpoints can be configured in `src/app/models/enums.ts` and `src/environments/environment.ts`
- Cookie configuration can be adjusted in `src/app/constants/auth.constants.ts`
- HTTP interceptor automatically adds authentication tokens to requests

## API Endpoints

### Mock API Endpoints

1. **Login API**
   - **URL**: `POST /api/login`
   - **Request Body**: `{ email: string, password: string }`
   - **Response**: `{ token: string, user: { email: string, id: number, name: string } }`
   - **Mock Credentials**: Email: `test@example.com`, Password: `Test@123`

2. **List API**
   - **URL**: `GET /api/items`
   - **Response**: `{ page: number, per_page: number, total: number, total_pages: number, data: [{ id: number, name: string, description: string, ... }] }`

### Real API Endpoints (reqres.in)

1. **Login API**
   - **URL**: `POST https://reqres.in/api/login`
   - **Request Body**: `{ email: string, password: string }`
   - **Response**: `{ token: string }`
   - **Working Credentials**: Email: `eve.holt@reqres.in`, Password: `cityslicka`

2. **Users API**
   - **URL**: `GET https://reqres.in/api/users?page=1&per_page=12`
   - **Response**: List of users with pagination

## Responsive Design
- The application is fully responsive and works on mobile devices

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
