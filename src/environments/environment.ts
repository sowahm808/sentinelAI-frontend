import { AppEnvironment } from './environment.model';
export const environment: AppEnvironment = {
  production: false,
  apiBaseUrl: '/api/v1',
  websocketUrl: 'ws://localhost:8080/events',
  mapProvider: 'maplibre',
  mapToken: '',
  demoMode: true,
  enableMockApi: true,
  enableServiceWorker: false,
  applicationVersion: '0.1.0',
  environmentName: 'demo',
  telemetryEndpoint: '',
  featureFlags: { administration: false, liveSend: false },
};
