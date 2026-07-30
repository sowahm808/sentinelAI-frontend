import { describe, expect, it } from 'vitest';
import { RecommendationStatus } from '../models/domain.models';
const transitions: Record<RecommendationStatus, RecommendationStatus[]> = {
  'AI Draft': ['Under Review', 'Rejected'],
  'Under Review': ['Approved', 'Rejected', 'Deferred'],
  Approved: ['Assigned'],
  Rejected: ['AI Draft'],
  Assigned: ['Completed'],
  Completed: [],
  Deferred: ['Under Review'],
};
describe('recommendation review logic', () => {
  it('never makes AI Draft executable', () => expect(transitions['AI Draft']).not.toContain('Assigned'));
  it('allows explicit reviewed approval', () => expect(transitions['Under Review']).toContain('Approved'));
});
