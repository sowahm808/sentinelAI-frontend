export type IncidentSeverity = 'Advisory' | 'Minor' | 'Moderate' | 'Major' | 'Critical' | 'Catastrophic';
export type IncidentStatus =
  'Draft' | 'Monitoring' | 'Active' | 'Escalated' | 'Stabilized' | 'Recovery' | 'Closed' | 'Cancelled';
export interface Coordinates {
  latitude: number;
  longitude: number;
}
export interface Incident {
  id: string;
  title: string;
  type: string;
  description: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  location: string;
  county: string;
  coordinates: Coordinates;
  reportedAt: string;
  commander: string;
  populationAffected: number;
  impactRadiusKm: number;
  completeness: number;
  objectives: string[];
  risks: string[];
}
export interface Hospital {
  id: string;
  name: string;
  type: string;
  location: string;
  distanceKm: number;
  status: string;
  emergencyStatus: string;
  traumaLevel: string;
  totalBeds: number;
  availableBeds: number;
  icuAvailable: number;
  diversion: boolean;
  helipad: boolean;
  contact: string;
  lastUpdated: string;
  dataSource: string;
  coordinates: Coordinates;
}
export interface Shelter {
  id: string;
  name: string;
  address: string;
  status: string;
  capacity: number;
  occupancy: number;
  accessibility: boolean;
  medicalSupport: boolean;
  pets: boolean;
  backupPower: boolean;
  food: boolean;
  water: boolean;
  connectivity: boolean;
  contact: string;
  lastUpdated: string;
  coordinates: Coordinates;
}
export type ResourceStatus =
  'Available' | 'Assigned' | 'EnRoute' | 'Deployed' | 'Returning' | 'Unavailable' | 'Maintenance';
export interface Resource {
  id: string;
  name: string;
  type: string;
  status: ResourceStatus;
  agency: string;
  incidentId?: string;
  coordinates: Coordinates;
  updatedAt: string;
}
export type RecommendationStatus =
  'AI Draft' | 'Under Review' | 'Approved' | 'Rejected' | 'Assigned' | 'Completed' | 'Deferred';
export interface Recommendation {
  id: string;
  priority: 'Immediate' | 'High' | 'Medium';
  category: string;
  action: string;
  reason: string;
  evidence: string[];
  expectedOutcome: string;
  responsibleRole: string;
  startTime: string;
  duration: string;
  confidence: number;
  dependencies: string[];
  safetyConstraints: string[];
  status: RecommendationStatus;
  note?: string;
}
export interface ResponsePlan {
  id: string;
  incidentId: string;
  situationSummary: string;
  objectives: string[];
  recommendations: Recommendation[];
  dataGaps: string[];
  assumptions: string[];
  risks: string[];
  confidence: number;
  sources: string[];
  generatedAt: string;
  engineVersion: string;
}
export interface TimelineEvent {
  id: string;
  incidentId: string;
  at: string;
  type: string;
  title: string;
  detail: string;
  actor: string;
}
export interface OperationalAlert {
  id: string;
  type: string;
  severity: IncidentSeverity;
  title: string;
  detail: string;
  status: string;
  updatedAt: string;
}
export interface PublicAlert {
  id: string;
  incidentId: string;
  audience: string;
  geographicTarget: string;
  severity: IncidentSeverity;
  headline: string;
  message: string;
  instructions: string;
  effectiveAt: string;
  expiresAt: string;
  channels: string[];
  approvalNotes: string;
  status: 'Draft' | 'Pending approval' | 'Approved' | 'Simulated' | 'Sent' | 'Failed' | 'Cancelled';
}
export const AI_DISCLAIMER =
  'AI-generated decision support. Recommendations must be reviewed and approved by authorized emergency personnel before action is taken.';
