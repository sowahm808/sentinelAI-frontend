import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DemoDataService } from '../../core/services/demo-data.service';
import { IncidentSeverity, PublicAlert } from '../../core/models/domain.models';
@Component({
  selector: 'sai-alert-composer',
  imports: [ReactiveFormsModule],
  template: `<header class="page-heading">
      <div>
        <p class="eyebrow">Alerts / New</p>
        <h1>Draft Public Alert</h1>
        <p>AI may suggest language; a Public Information Officer must edit and approve it.</p>
      </div>
      <button class="secondary" (click)="aiDraft()" [disabled]="drafting()">
        {{ drafting() ? 'Drafting…' : '✦ Request AI draft' }}
      </button>
    </header>
    <div class="ai-disclaimer">
      ⓘ AI-generated draft language is decision support and requires authorized review. Sending is not automatic.
    </div>
    <form class="incident-form" [formGroup]="form" (ngSubmit)="save()">
      <section class="panel">
        <h2>Target and classification</h2>
        <div class="form-grid">
          <label
            >Incident<select formControlName="incidentId">
              <option value="inc-tornado-01">Lewisville Tornado Response</option>
            </select></label
          ><label>Audience<input formControlName="audience" /></label
          ><label class="full">Geographic target<input formControlName="geographicTarget" /></label
          ><label
            >Severity<select formControlName="severity">
              <option>Moderate</option>
              <option>Major</option>
              <option>Critical</option>
            </select></label
          ><label
            >Channels<select multiple formControlName="channels">
              <option>SMS</option>
              <option>Email</option>
              <option>Push</option>
              <option>Voice</option>
              <option>Social</option>
              <option>CAP</option>
              <option>Internal</option>
            </select></label
          >
        </div>
      </section>
      <section class="panel">
        <h2>Message</h2>
        <div class="form-grid">
          <label class="full"
            >Headline *<input formControlName="headline" maxlength="90" /><small
              >{{ form.controls.headline.value.length }} / 90</small
            ></label
          ><label class="full">Message *<textarea formControlName="message" rows="5"></textarea></label
          ><label class="full">Instructions *<textarea formControlName="instructions" rows="3"></textarea></label
          ><label>Effective time<input type="datetime-local" formControlName="effectiveAt" /></label
          ><label>Expiration time<input type="datetime-local" formControlName="expiresAt" /></label
          ><label class="full">Approval notes<textarea formControlName="approvalNotes" rows="2"></textarea></label>
        </div>
      </section>
      @if (error()) {
        <div class="error-banner" role="alert">
          Complete all required message fields and select at least one channel.
        </div>
      }
      <div class="form-actions">
        <button class="secondary" type="button" (click)="save('Draft')">Save draft</button
        ><button class="primary" type="submit">Submit for human approval</button>
      </div>
    </form>`,
})
export class AlertComposerComponent {
  readonly drafting = signal(false);
  readonly error = signal(false);
  readonly form = new FormGroup({
    incidentId: new FormControl('inc-tornado-01', { nonNullable: true }),
    audience: new FormControl('Residents and visitors in the affected area', {
      nonNullable: true,
      validators: Validators.required,
    }),
    geographicTarget: new FormControl('West Lewisville demonstration impact zone', {
      nonNullable: true,
      validators: Validators.required,
    }),
    severity: new FormControl<IncidentSeverity>('Critical', { nonNullable: true }),
    headline: new FormControl('', { nonNullable: true, validators: Validators.required }),
    message: new FormControl('', { nonNullable: true, validators: Validators.required }),
    instructions: new FormControl('', { nonNullable: true, validators: Validators.required }),
    effectiveAt: new FormControl(new Date().toISOString().slice(0, 16), { nonNullable: true }),
    expiresAt: new FormControl(new Date(Date.now() + 2 * 3600000).toISOString().slice(0, 16), { nonNullable: true }),
    channels: new FormControl<string[]>(['SMS', 'Push'], { nonNullable: true, validators: Validators.required }),
    approvalNotes: new FormControl('', { nonNullable: true }),
  });
  constructor(
    private readonly data: DemoDataService,
    private readonly router: Router,
  ) {}
  aiDraft() {
    this.drafting.set(true);
    setTimeout(() => {
      this.form.patchValue({
        headline: 'TORNADO RESPONSE: Avoid west Lewisville damage area',
        message:
          'Emergency crews are working in a storm-damage area in west Lewisville. This is a demonstration message. Avoid the affected area so responders can work safely.',
        instructions:
          'Use designated routes, keep roads clear for emergency vehicles, and monitor verified local channels for updates.',
      });
      this.drafting.set(false);
    }, 600);
  }
  save(status: PublicAlert['status'] = 'Pending approval') {
    if (this.form.invalid) {
      this.error.set(true);
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    this.data.saveAlert({
      ...v,
      id: crypto.randomUUID(),
      status,
      effectiveAt: new Date(v.effectiveAt).toISOString(),
      expiresAt: new Date(v.expiresAt).toISOString(),
    });
    void this.router.navigate(['/alerts']);
  }
}
