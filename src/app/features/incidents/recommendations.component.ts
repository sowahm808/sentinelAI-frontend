import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DemoDataService } from '../../core/services/demo-data.service';
import { AI_DISCLAIMER, RecommendationStatus } from '../../core/models/domain.models';
@Component({
  selector: 'sai-recommendations',
  imports: [FormsModule, DatePipe],
  template: `<header class="page-heading">
      <div>
        <p class="eyebrow">Lewisville Tornado Response / Decision support</p>
        <h1>AI Response Plan</h1>
        <p>Generate structured planning options, then review every action before it enters operations.</p>
      </div>
    </header>
    <div class="ai-disclaimer persistent" role="note">
      ⓘ <strong>{{ disclaimer }}</strong>
    </div>
    <section class="plan-request panel">
      <h2>Planning request</h2>
      <div class="form-grid">
        <label
          >Planning horizon<select [(ngModel)]="horizon">
            <option>15 minutes</option>
            <option>30 minutes</option>
            <option>1 hour</option>
            <option>4 hours</option>
            <option>12 hours</option>
            <option>24 hours</option>
          </select></label
        ><label class="full">Operational priorities<textarea [(ngModel)]="priorities" rows="2"></textarea></label
        ><label class="full">Additional constraints<textarea [(ngModel)]="constraints" rows="2"></textarea></label>
        <fieldset class="full">
          <legend>Include in plan</legend>
          @for (x of includes; track x) {
            <label><input type="checkbox" checked />{{ x }}</label>
          }
        </fieldset>
      </div>
      <button class="primary" (click)="generate()" [disabled]="generating()">
        {{ generating() ? 'Synthesizing verified inputs…' : 'Generate response plan' }}
      </button>
    </section>
    @if (generated()) {
      <section class="plan-summary">
        <div>
          <span class="confidence">{{ data.plan().confidence }}% confidence</span>
          <h2>Situation synthesis</h2>
          <p>{{ data.plan().situationSummary }}</p>
        </div>
        <dl>
          <div>
            <dt>Generated</dt>
            <dd>{{ data.plan().generatedAt | date: 'medium' }}</dd>
          </div>
          <div>
            <dt>Engine</dt>
            <dd>{{ data.plan().engineVersion }}</dd>
          </div>
          <div>
            <dt>Sources used</dt>
            <dd>{{ data.plan().sources.length }} synthetic and operational inputs</dd>
          </div>
        </dl>
      </section>
      <div class="recommendations">
        <div class="section-title">
          <h2>Recommended actions</h2>
          <span>{{ data.plan().recommendations.length }} require human disposition</span>
        </div>
        @for (r of data.plan().recommendations; track r.id) {
          <article class="recommendation">
            <div class="rec-heading">
              <span class="priority-badge">{{ r.priority }}</span
              ><span class="status">{{ r.status }}</span
              ><span class="confidence">{{ r.confidence }}% confidence</span>
            </div>
            <p class="category">{{ r.category }}</p>
            <h3>{{ r.action }}</h3>
            <p>{{ r.reason }}</p>
            <div class="rec-detail">
              <div>
                <b>Expected outcome</b><span>{{ r.expectedOutcome }}</span>
              </div>
              <div>
                <b>Responsible role</b><span>{{ r.responsibleRole }}</span>
              </div>
              <div>
                <b>Start / duration</b><span>{{ r.startTime }} · {{ r.duration }}</span>
              </div>
              <div>
                <b>Dependencies</b><span>{{ r.dependencies.join(', ') }}</span>
              </div>
              <div>
                <b>Evidence</b><span>{{ r.evidence.join(', ') }}</span>
              </div>
              <div>
                <b>Safety constraints</b><span>{{ r.safetyConstraints.join(', ') }}</span>
              </div>
            </div>
            <label>Add review note<textarea rows="2" placeholder="Document rationale or changes"></textarea></label>
            <div class="rec-actions">
              <button class="approve" (click)="review(r.id, 'Approved')" [disabled]="r.status === 'Approved'">
                ✓ Approve</button
              ><button class="danger-outline" (click)="review(r.id, 'Rejected')">× Reject</button
              ><button class="secondary" (click)="review(r.id, 'Assigned')">Assign</button
              ><button class="secondary" (click)="review(r.id, 'Deferred')">Defer</button
              ><button class="secondary">Edit</button><button class="secondary">Regenerate</button>
            </div>
          </article>
        }
      </div>
      <section class="panel">
        <h2>Planning transparency</h2>
        <div class="three-cols">
          <div>
            <h3>Data gaps</h3>
            <ul>
              @for (x of data.plan().dataGaps; track x) {
                <li>{{ x }}</li>
              }
            </ul>
          </div>
          <div>
            <h3>Assumptions</h3>
            <ul>
              @for (x of data.plan().assumptions; track x) {
                <li>{{ x }}</li>
              }
            </ul>
          </div>
          <div>
            <h3>Risks</h3>
            <ul>
              @for (x of data.plan().risks; track x) {
                <li>{{ x }}</li>
              }
            </ul>
          </div>
        </div>
      </section>
    }`,
})
export class RecommendationsComponent {
  horizon = '1 hour';
  priorities = 'Life safety, primary search, hospital distribution, public protective guidance';
  constraints = 'Maintain responder accountability and utility exclusion zones.';
  readonly includes = [
    'Public-alert draft',
    'Hospital routing',
    'Shelter strategy',
    'Evacuation guidance',
    'Resource deployment',
  ];
  readonly generating = signal(false);
  readonly generated = signal(true);
  readonly disclaimer = AI_DISCLAIMER;
  constructor(readonly data: DemoDataService) {}
  generate() {
    this.generating.set(true);
    setTimeout(() => {
      this.generated.set(true);
      this.generating.set(false);
    }, 700);
  }
  review(id: string, status: RecommendationStatus) {
    this.data.updateRecommendation(id, status);
  }
}
