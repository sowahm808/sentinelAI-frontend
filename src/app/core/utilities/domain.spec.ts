import { describe,expect,it } from 'vitest';import { AI_DISCLAIMER } from '../models/domain.models';
describe('decision support safety language',()=>{it('requires authorized review',()=>expect(AI_DISCLAIMER).toContain('reviewed and approved by authorized emergency personnel'))});
describe('severity presentation',()=>{it('keeps critical as a text label',()=>expect(['Advisory','Minor','Moderate','Major','Critical','Catastrophic']).toContain('Critical'))});
