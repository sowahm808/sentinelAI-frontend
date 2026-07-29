# Frontend security

The browser is not an authorization boundary. Guards and permission controls improve UX; the backend must authorize every request. No AI provider key or map-provider secret belongs in source or runtime JavaScript. Use short-lived OAuth/OIDC access tokens in production, preferably with a BFF and secure, HttpOnly, SameSite cookies.

The supplied Nginx policy restricts script, style, image, font, and connection origins. Adjust `connect-src` to the deployment API and map tile origins. Do not persist sensitive operational data. This POC stores only the demo session and safe local incident drafts in tab-scoped `sessionStorage`. Alert sends and incident closures must never be queued offline. Render text through Angular interpolation; do not introduce unsanitized HTML.
