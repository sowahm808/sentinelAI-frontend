import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DemoDataService } from '../../core/services/demo-data.service';
import { AI_DISCLAIMER } from '../../core/models/domain.models';
@Component({
  selector: 'sai-situation-report',
  imports: [DatePipe],
  template: `<header class="page-heading no-print">
      <div>
        <p class="eyebrow">Incident reports / Situation</p>
        <h1>Situation Report</h1>
        <p>Review authorship and operational facts before printing or export.</p>
      </div>
      <div>
        <button class="secondary" (click)="download()">Download PDF</button>
        <button class="primary" (click)="print()">Print / Save PDF</button>
      </div>
    </header>
    <div class="demo-notice no-print">
      <strong>Demonstration report.</strong> Backend PDF is unavailable; browser print provides a print-optimized
      export.
    </div>
    <article class="sitrep">
      <header>
        <div class="brand">
          <span class="shield small">S</span><span><b>SentinelAI</b><small>AI That Helps Save Lives</small></span>
        </div>
        <div>
          <span class="severity">◆ CRITICAL</span>
          <p>SITREP 003 · DEMONSTRATION</p>
        </div>
      </header>
      <h1>Lewisville Tornado Response</h1>
      <p class="lede">Situation report for the 12:00–00:00 operational period</p>
      <dl class="report-meta">
        <div>
          <dt>Prepared by</dt>
          <dd>Planning Section · Jordan Lee</dd>
        </div>
        <div>
          <dt>Generated</dt>
          <dd>{{ generated | date: 'medium' }}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>Draft for command approval</dd>
        </div>
        <div>
          <dt>Data through</dt>
          <dd>{{ generated | date: 'shortTime' }} · synthetic</dd>
        </div>
      </dl>
      <section>
        <h2>1. Incident summary & current conditions</h2>
        <p>{{ data.plan().situationSummary }}</p>
        <div class="map-snapshot">
          <span>⌖</span><b>Operational map snapshot</b><small>Impact zone · hospitals · shelters · closures</small>
        </div>
      </section>
      <section>
        <h2>2. Incident objectives</h2>
        <ol>
          @for (o of data.incidents()[0]!.objectives; track o) {
            <li>{{ o }}</li>
          }
        </ol>
      </section>
      <section>
        <h2>3. Actions completed and pending</h2>
        <div class="report-columns">
          <div>
            <h3>Completed</h3>
            <ul>
              <li>Unified command established</li>
              <li>Initial damage corridor mapped</li>
              <li>Hospital coordination channel activated</li>
            </ul>
          </div>
          <div>
            <h3>Pending</h3>
            <ul>
              <li>Primary search sector completion</li>
              <li>Utility isolation field verification</li>
              <li>Public protective-action update approval</li>
            </ul>
          </div>
        </div>
      </section>
      <section>
        <h2>4. AI-assisted recommendations</h2>
        <div class="ai-disclaimer">ⓘ {{ disclaimer }}</div>
        @for (r of data.plan().recommendations; track r.id) {
          <div class="report-rec">
            <b>{{ r.priority }} · {{ r.category }}</b
            ><span>{{ r.action }}</span
            ><em>{{ r.status }} · {{ r.confidence }}% confidence</em>
          </div>
        }
      </section>
      <section>
        <h2>5. Resources, hospitals & shelters</h2>
        <div class="capacity">
          <div>
            <strong>{{ assignedCount() }}</strong
            ><span>Resources assigned</span>
          </div>
          <div>
            <strong>{{ bedCount() }}</strong
            ><span>Synthetic available beds</span>
          </div>
          <div>
            <strong>{{ spaceCount() }}</strong
            ><span>Synthetic shelter spaces</span>
          </div>
        </div>
      </section>
      <section>
        <h2>6. Key risks & data gaps</h2>
        <div class="report-columns">
          <div>
            <h3>Risks</h3>
            <ul>
              @for (x of data.plan().risks; track x) {
                <li>{{ x }}</li>
              }
            </ul>
          </div>
          <div>
            <h3>Data gaps</h3>
            <ul>
              @for (x of data.plan().dataGaps; track x) {
                <li>{{ x }}</li>
              }
            </ul>
          </div>
        </div>
      </section>
      <footer>
        <div>
          <span>Incident Commander approval</span>
          <hr />
          <small>Name / signature / date</small>
        </div>
        <div>
          <span>Planning Section authorship</span>
          <hr />
          <small>Jordan Lee · demonstration user</small>
        </div>
      </footer>
    </article>`,
})
export class SituationReportComponent {
  readonly generated = new Date();
  readonly disclaimer = AI_DISCLAIMER;
  constructor(readonly data: DemoDataService) {}
  assignedCount() {
    return this.data.resources().filter((r) => r.incidentId).length;
  }
  print() {
    window.print();
  }
  download() {
    window.print();
  }
  bedCount() {
    return this.data.hospitals().reduce((n, h) => n + h.availableBeds, 0);
  }
  spaceCount() {
    return this.data.shelters().reduce((n, s) => n + s.capacity - s.occupancy, 0);
  }
}
