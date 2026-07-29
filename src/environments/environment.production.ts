import { AppEnvironment } from './environment.model';
export const environment: AppEnvironment = { production:true, apiBaseUrl:'/api/v1', websocketUrl:'/events', mapProvider:'maplibre', mapToken:'', demoMode:true, enableMockApi:true, enableServiceWorker:false, applicationVersion:'0.1.0', environmentName:'production-demo', telemetryEndpoint:'', featureFlags:{administration:false,liveSend:false} };
