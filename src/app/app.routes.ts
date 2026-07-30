import { Routes } from '@angular/router';
import { authGuard, permissionGuard } from './core/guards/auth.guard';
export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/login.component').then((m) => m.LoginComponent) },
  {
    path: 'forgot-password',
    loadComponent: () => import('./shared/components/info-page.component').then((m) => m.InfoPageComponent),
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./shared/components/info-page.component').then((m) => m.InfoPageComponent),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./core/layout/shell.component').then((m) => m.ShellComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'incidents',
        canActivate: [permissionGuard('incidents.read')],
        loadComponent: () => import('./features/incidents/incidents.component').then((m) => m.IncidentsComponent),
      },
      {
        path: 'incidents/new',
        canActivate: [permissionGuard('incidents.create')],
        loadComponent: () =>
          import('./features/incidents/incident-create.component').then((m) => m.IncidentCreateComponent),
      },
      {
        path: 'incidents/:incidentId/command',
        canActivate: [permissionGuard('incidents.command')],
        loadComponent: () =>
          import('./features/command-center/command-center.component').then((m) => m.CommandCenterComponent),
      },
      {
        path: 'incidents/:incidentId/recommendations',
        canActivate: [permissionGuard('recommendations.review')],
        loadComponent: () =>
          import('./features/incidents/recommendations.component').then((m) => m.RecommendationsComponent),
      },
      {
        path: 'incidents/:incidentId/timeline',
        loadComponent: () => import('./features/incidents/timeline.component').then((m) => m.TimelineComponent),
      },
      {
        path: 'incidents/:incidentId/reports/situation',
        canActivate: [permissionGuard('reports.generate')],
        loadComponent: () =>
          import('./features/reports/situation-report.component').then((m) => m.SituationReportComponent),
      },
      {
        path: 'incidents/:incidentId/reports',
        loadComponent: () => import('./features/reports/reports.component').then((m) => m.ReportsComponent),
      },
      { path: 'map', loadComponent: () => import('./features/map/map-page.component').then((m) => m.MapPageComponent) },
      {
        path: 'hospitals',
        loadComponent: () => import('./features/hospitals/hospitals.component').then((m) => m.HospitalsComponent),
      },
      {
        path: 'shelters',
        loadComponent: () => import('./features/shelters/shelters.component').then((m) => m.SheltersComponent),
      },
      {
        path: 'resources',
        canActivate: [permissionGuard('resources.read')],
        loadComponent: () => import('./features/resources/resources.component').then((m) => m.ResourcesComponent),
      },
      {
        path: 'alerts',
        loadComponent: () => import('./features/alerts/alerts.component').then((m) => m.AlertsComponent),
      },
      {
        path: 'alerts/new',
        canActivate: [permissionGuard('alerts.draft')],
        loadComponent: () => import('./features/alerts/alert-composer.component').then((m) => m.AlertComposerComponent),
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/reports/reports.component').then((m) => m.ReportsComponent),
      },
      {
        path: 'administration',
        loadComponent: () => import('./shared/components/info-page.component').then((m) => m.InfoPageComponent),
      },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
  },
  { path: '**', redirectTo: '/dashboard' },
];
