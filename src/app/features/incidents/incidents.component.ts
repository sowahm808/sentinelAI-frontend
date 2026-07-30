import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DemoDataService } from '../../core/services/demo-data.service';
@Component({
  selector: 'sai-incidents',
  imports: [FormsModule, RouterLink],
  template: `<header class="page-heading">
      <div>
        <p class="eyebrow">Incident management</p>
        <h1>Incidents</h1>
        <p>Search, filter, and open the incidents your organization is coordinating.</p>
      </div>
      <a class="primary button" routerLink="/incidents/new">＋ Create incident</a>
    </header>
    <section class="filter-panel" aria-label="Incident filters">
      <label>Search<input [(ngModel)]="search" placeholder="Name, location, or commander" /></label
      ><label
        >Status<select [(ngModel)]="status">
          <option value="">All statuses</option>
          <option>Monitoring</option>
          <option>Active</option>
          <option>Escalated</option>
        </select></label
      ><label
        >Severity<select [(ngModel)]="severity">
          <option value="">All severities</option>
          <option>Moderate</option>
          <option>Major</option>
          <option>Critical</option>
        </select></label
      ><label
        >Type<select>
          <option>All types</option>
          <option>Tornado</option>
          <option>Flood</option>
          <option>Wildfire</option>
        </select></label
      ><button class="secondary" (click)="clear()">Clear filters</button>
    </section>
    <div class="list-summary">
      <b>{{ filtered().length }} incidents</b><span>Filter state is retained for this session.</span>
    </div>
    @if (filtered().length) {
      <div class="incident-list">
        @for (i of filtered(); track i.id) {
          <article>
            <div>
              <span class="severity">◆ {{ i.severity }}</span
              ><span class="status">{{ i.status }}</span>
            </div>
            <h2>{{ i.title }}</h2>
            <p>{{ i.description }}</p>
            <dl>
              <div>
                <dt>Location</dt>
                <dd>{{ i.location }}</dd>
              </div>
              <div>
                <dt>Commander</dt>
                <dd>{{ i.commander }}</dd>
              </div>
              <div>
                <dt>Potentially affected</dt>
                <dd>{{ i.populationAffected.toLocaleString() }}</dd>
              </div>
              <div>
                <dt>Data confidence</dt>
                <dd>{{ i.completeness }}%</dd>
              </div>
            </dl>
            <a class="secondary button" [routerLink]="['/incidents', i.id, 'command']">Open command workspace</a>
          </article>
        }
      </div>
    } @else {
      <div class="empty-state">
        <b>No incidents match these filters.</b>
        <p>Clear one or more filters or create a new incident.</p>
        <button class="secondary" (click)="clear()">Clear filters</button>
      </div>
    }`,
})
export class IncidentsComponent {
  search = sessionStorage.getItem('incident-search') ?? '';
  status = '';
  severity = '';
  filtered() {
    const q = this.search.toLowerCase();
    sessionStorage.setItem('incident-search', this.search);
    return this.data
      .incidents()
      .filter(
        (i) =>
          (!q || `${i.title} ${i.location} ${i.commander}`.toLowerCase().includes(q)) &&
          (!this.status || i.status === this.status) &&
          (!this.severity || i.severity === this.severity),
      );
  }
  constructor(readonly data: DemoDataService) {}
  clear() {
    this.search = '';
    this.status = '';
    this.severity = '';
  }
}
