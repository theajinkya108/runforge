export type AlertSource = 'cloudwatch' | 'datadog' | 'simulator';

export type IncidentSeverity = 'critical' | 'high' | 'medium' | 'low';

export type IncidentStatus = 'open' | 'analysing' | 'runbook_generated' | 'resolved';

export interface Alert {
  id: string;
  source: AlertSource;
  serviceName: string;
  alertName: string;
  description: string;
  timestamp: Date;
  rawPayload: Record<string, unknown>;
}

export interface Incident {
  id: string;
  alert: Alert;
  severity: IncidentSeverity;
  status: IncidentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Runbook {
  id: string;
  incidentId: string;
  probableCause: string;
  confidence: 'high' | 'medium' | 'low';
  affectedServices: string[];
  fixSteps: string[];
  rollbackRecommended: boolean;
  escalateTo: string;
  similarIncidentIds: string[];
  generatedAt: Date;
}