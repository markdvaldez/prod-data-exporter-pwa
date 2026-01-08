# Runners QC App - AI Coding Instructions

## Project Overview
This repository is the Runners QC App, a Next.js 15 PWA focused on runners quality-control workflows. Key architecture: AWS Cognito auth, GraphQL API, Redux-Saga state management, offline-first PWA with service-worker and localforage support.

## Essential Architecture

### State Management Pattern
- **Redux + Redux-Saga**: Primary state management with `src/services/store/`
- **TanStack Query**: API calls and caching via `src/services/api/queryProvider.tsx`
- **Redux-Persist**: Offline state persistence with whitelist: `['auth', 'history', 'offlineQueue', 'horseMedical']`
- Use typed hooks: `useSelector` and `useDispatch` from store index, NOT react-redux directly

### Container/Component Architecture
- **Containers**: `src/llvtApp/containers/` - business logic, data fetching, state connections (note: folder name kept for historical reasons)
- **UI Kit**: `src/ui-kit/` - reusable components using shadcn/ui + Radix
- **Pages**: Thin wrappers that compose containers, minimal logic
- Follow container pattern: logic in containers, presentation in ui-kit components

### Authentication & Route Protection
- **HOC Pattern**: Use `withAuth()` from `src/hooks/withAuth.tsx` for protected components
- **Middleware**: `src/middleware.ts` handles auth redirects and cookie rewriting
- **Routes**: Centralized in `src/routes/index.ts` with typed route functions
- Auth redirects: unauthenticated → `/login`, no access → `/request-access`

### Environment & Configuration
- **Multi-environment**: Use `CONFIGURATION` env var (development/qa/staging/production)
- **Environment files**: `.env.{CONFIGURATION}` pattern
- **Build scripts**: `npm run build-{env}` and `npm run start-{env}` for each environment
- **Config**: `src/services/appConfig/env.config.js` centralizes environment variables

## Development Workflows

### Running & Building
```bash
# Development with HTTPS
npm run dev

# Environment-specific builds
npm run build-qa
npm run start-staging

# GraphQL codegen (after schema changes)
npm run codegen

# Testing with UTC timezone
npm test
npm run test:watch
```

### GraphQL Development
- **Schema**: Auto-generated from `https://dbapi.dev1.hisausapps.org/graphql`
- **Codegen**: Run `npm run codegen` after adding new GraphQL queries
- **Client**: Generated types in `src/services/gql/` using client preset
- **API Key**: Uses `"Key1"` for development schema introspection

### PWA & Offline Features
- **Service Worker**: Custom worker in `worker/index.ts`
- **Offline Storage**: `localforage` instances for files (`src/services/offlineFileService/`)
- **Caching**: Next.js pages cached for 24h, RSC prefetching enabled
- **Install Prompts**: Platform-specific install handlers in `src/shared/PWAInstallHandler/`

## Key Conventions

### File Organization
- **Barrel exports**: Most directories have `index.ts` for clean imports
- **Feature folders**: Group related containers, hooks, and types by feature
- **Shared services**: Global utilities in `src/services/` (api, aws, store, etc.)
- **UI separation**: Pure UI in `ui-kit/`, business logic in `llvtApp/`

### Naming & Patterns
- **Containers**: End with `Container` (e.g., `DashboardLayoutContainer`)
- **Hooks**: Custom hooks start with `use` in `src/hooks/`
- **Types**: Centralized in `src/Types/` with barrel exports
- **Routes**: Use route functions from `src/routes/` instead of string literals

### Testing Setup
- **Jest + Testing Library**: Pre-configured with Next.js integration
- **UTC timezone**: All tests run in UTC (`TZ=UTC`)
- **Mocks**: UI components mocked in `__mocks__/` (lucide-react, etc.)
- **Coverage**: Configured for src/ with exclusions for stories, tests, index files

## Integration Points

### AWS Services
- **Cognito**: User authentication with server-side validation in middleware
- **S3/CloudFront**: File uploads and asset serving
- **Amplify**: Server-side configuration in `src/services/aws/`

### External APIs
- **GraphQL Endpoint**: Primary data source with typed queries
- **REST APIs**: Swagger-generated types in `src/Types/global-types.ts`
- **Analytics**: Dynatrace RUM and Google Analytics integration

### Monitoring & Observability
- **Dynatrace**: Script injection in layout for RUM monitoring
- **Navigation logging**: Custom navigation tracking in `src/shared/NavigationLogger/`
- **Network status**: Offline detection and sync status indicators

## Common Patterns

When creating new features:
1. **Container first**: Create container in `src/llvtApp/containers/`
2. **UI components**: Build reusable components in `src/ui-kit/`
3. **State management**: Add Redux slice if needed, use sagas for async
4. **Route integration**: Add typed routes to `src/routes/index.ts`
5. **Auth protection**: Wrap with `withAuth()` if authenticated route

When adding API integration:
1. **GraphQL**: Add queries to relevant files, run `npm run codegen`
2. **TanStack Query**: Create custom hooks in appropriate feature folders
3. **Error handling**: Use consistent error boundaries and toast notifications
4. **Offline queue**: Consider offline scenarios for data mutations