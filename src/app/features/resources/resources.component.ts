import { Component, computed, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DemoDataService } from '../../core/services/demo-data.service';
import { Resource } from '../../core/models/domain.models';
@Component({
  selector: 'sai-resources',
  imports: [DatePipe],
  template: `<header class="page-heading">
      <div>
        <p class="eyebrow">Logistics & operations</p>
        <h1>Response Resources</h1>
        <p>Track readiness, location, assignments, and status history.</p>
      </div>
    </header>
    <div class="status-cards">
      @for (x of counts(); track x.status) {
        <article>
          <span class="resource-state">●</span><strong>{{ x.count }}</strong
          ><small>{{ x.status }}</small>
        </article>
      }
    </div>
    <div class="table-wrap">
      <table>
        <caption>
          Twenty synthetic response resources
        </caption>
        <thead>
          <tr>
            <th>Resource</th>
            <th>Type</th>
            <th>Agency</th>
            <th>Status</th>
            <th>Assignment</th>
            <th>Updated</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          @for (r of data.resources(); track r.id) {
            <tr (click)="selected.set(r)">
              <th scope="row">{{ r.name }}</th>
              <td>{{ r.type }}</td>
              <td>{{ r.agency }}</td>
              <td>
                <span class="status">{{ r.status }}</span>
              </td>
              <td>{{ r.incidentId ? 'Lewisville Tornado' : 'Unassigned' }}</td>
              <td>{{ r.updatedAt | date: 'shortTime' }}</td>
              <td>
                <button
                  class="secondary"
                  (click)="$event.stopPropagation(); assign(r)"
                  [disabled]="r.status === 'Assigned'"
                >
                  Assign
                </button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
    @if (selected()) {
      <aside class="drawer">
        <button (click)="selected.set(null)" aria-label="Close resource details">×</button>
        <p class="eyebrow">Resource detail</p>
        <h2>{{ selected()!.name }}</h2>
        <span class="status">{{ selected()!.status }}</span>
        <dl>
          <div>
            <dt>Agency</dt>
            <dd>{{ selected()!.agency }}</dd>
          </div>
          <div>
            <dt>Current incident</dt>
            <dd>{{ selected()!.incidentId ?? 'Unassigned' }}</dd>
          </div>
          <div>
            <dt>Last update</dt>
            <dd>{{ selected()!.updatedAt | date: 'medium' }}</dd>
          </div>
        </dl>
        <h3>Assignment history</h3>
        <p class="muted">Checked into demo staging · 14:05</p>
        <button class="primary" (click)="assign(selected()!)">Assign to tornado response</button>
      </aside>
    }
    @if (confirming()) {
      <div class="dialog-backdrop">
        <section class="dialog" role="dialog" aria-modal="true" aria-labelledby="assign-title">
          <h2 id="assign-title">Confirm resource assignment</h2>
          <p>
            Assign <strong>{{ confirming()!.name }}</strong> to Lewisville Tornado Response? Dispatch and backend
            authorization are simulated.
          </p>
          <div>
            <button class="secondary" (click)="confirming.set(null)">Cancel</button
            ><button class="primary" (click)="confirmAssign()">Confirm assignment</button>
          </div>
        </section>
      </div>
    }`,
})
export class ResourcesComponent {
  readonly selected = signal<Resource | null>(null);
  readonly confirming = signal<Resource | null>(null);
  readonly counts = computed(() =>
    ['Available', 'Assigned', 'EnRoute', 'Deployed', 'Returning', 'Unavailable', 'Maintenance'].map((status) => ({
      status,
      count: this.data.resources().filter((r) => r.status === status).length,
    })),
  );
  constructor(readonly data: DemoDataService) {}
  assign(r: Resource) {
    this.confirming.set(r);
  }
  confirmAssign() {
    const r = this.confirming();
    if (r) this.data.assignResource(r.id);
    this.confirming.set(null);
  }
}
