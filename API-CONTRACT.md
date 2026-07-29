# API contract expectations

Base: `{apiBaseUrl}` (default `/api/v1`). All requests include `Authorization: Bearer …` and `X-Correlation-ID`. Errors should return `{ code, message, correlationId, fieldErrors? }` without stack traces or provider payloads.

Resources: `/auth`, `/dashboard`, `/incidents`, `/recommendations`, `/map-data`, `/weather`, `/traffic`, `/hospitals`, `/shelters`, `/resources`, `/alerts`, `/reports`, `/users`, `/organizations`. AI requests go only to `/incidents/{id}/recommendations`; the browser never contacts an AI provider. PDF download is `/incidents/{id}/reports/{type}.pdf`.

Event types: `incident.created`, `incident.updated`, `incident.status.changed`, `incident.timeline.added`, `recommendation.generated`, `recommendation.reviewed`, `resource.status.changed`, `resource.assigned`, `hospital.capacity.updated`, `shelter.capacity.updated`, `alert.status.changed`, and `system.connection.changed`. Events require stable IDs, organization scope, incident scope where relevant, timestamp, and version.
