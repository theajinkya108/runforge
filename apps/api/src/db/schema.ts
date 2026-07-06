import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
  boolean,
  vector,
} from 'drizzle-orm/pg-core'

export const incidents = pgTable('incidents', {
  id: uuid('id').primaryKey().defaultRandom(),
  serviceName: text('service_name').notNull(),
  alertName: text('alert_name').notNull(),
  description: text('description').notNull(),
  severity: text('severity').notNull().default('medium'),
  status: text('status').notNull().default('open'),
  source: text('source').notNull(),
  rawPayload: jsonb('raw_payload').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const runbooks = pgTable('runbooks', {
  id: uuid('id').primaryKey().defaultRandom(),
  incidentId: uuid('incident_id')
    .notNull()
    .references(() => incidents.id, { onDelete: 'cascade' }),
  probableCause: text('probable_cause').notNull(),
  confidence: text('confidence').notNull(),
  affectedServices: jsonb('affected_services').notNull().default([]),
  fixSteps: jsonb('fix_steps').notNull().default([]),
  rollbackRecommended: boolean('rollback_recommended').notNull().default(false),
  escalateTo: text('escalate_to').notNull(),
  similarIncidentIds: jsonb('similar_incident_ids').notNull().default([]),
  generatedAt: timestamp('generated_at').defaultNow().notNull(),
})

export const incidentEmbeddings = pgTable('incident_embeddings', {
  id: uuid('id').primaryKey().defaultRandom(),
  incidentId: uuid('incident_id')
    .notNull()
    .references(() => incidents.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  embedding: vector('embedding', { dimensions: 1536 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type Incident = typeof incidents.$inferSelect
export type NewIncident = typeof incidents.$inferInsert
export type Runbook = typeof runbooks.$inferSelect
export type NewRunbook = typeof runbooks.$inferInsert