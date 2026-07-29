export type Permission='incidents.read'|'incidents.create'|'incidents.update'|'incidents.command'|'recommendations.generate'|'recommendations.review'|'alerts.draft'|'alerts.send'|'resources.read'|'resources.update'|'reports.generate'|'admin.manage';
export type Role='SystemAdministrator'|'EmergencyManager'|'IncidentCommander'|'OperationsOfficer'|'PlanningOfficer'|'LogisticsOfficer'|'HospitalCoordinator'|'PublicInformationOfficer'|'ExecutiveViewer';
export interface AuthUser { id:string; name:string; email:string; organization:string; role:Role; permissions:Permission[] }
export interface Session { user:AuthUser; accessToken:string; expiresAt:number }
