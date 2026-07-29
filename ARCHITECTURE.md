# Architecture

SentinelAI uses standalone Angular components, route-level lazy loading, feature-first folders, strict TypeScript, scoped signal services, and RxJS at HTTP/event boundaries. `DemoDataService` is the deterministic POC adapter; it exposes typed read-only signals and command methods so a REST adapter can replace it without changing views.

## Detected baseline and decision log

The repository initially contained only a README. There was no application or compatibility constraint to preserve. The main delivery risks are unavailable package-registry access, no backend contract, no authoritative GIS/capacity feeds, and browser automation requiring a Chromium binary. The POC therefore uses a MapLibre-ready operational canvas and explicit synthetic labels. It does not claim official or offline command capability.

## State and boundaries

Authentication persists only a short-lived demo session in `sessionStorage`. Incident draft state is safe local draft data. Feature state distinguishes visible loading or empty states in its workflow; production adapters should formalize `initial | loading | loaded | refreshing | empty | error | stale`. Mutations remain explicit commands and are never silently retried.

The HTTP interceptor attaches correlation and bearer headers, normalizes errors, redirects 401/403, and retries only transient GET requests. A production event adapter should expose typed organization and incident streams with event-id deduplication, exponential reconnect, and polling fallback.
