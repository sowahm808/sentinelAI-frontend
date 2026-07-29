import { describe,expect,it } from 'vitest';import { Validators } from '@angular/forms';
describe('incident coordinate validation',()=>{it('rejects latitude outside valid range',()=>expect(Validators.max(90)({value:91} as never)).not.toBeNull());it('accepts zero affected population',()=>expect(Validators.min(0)({value:0} as never)).toBeNull())});
