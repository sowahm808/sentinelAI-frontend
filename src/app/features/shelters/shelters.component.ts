import { Component } from '@angular/core';
import { DatePipe, PercentPipe } from '@angular/common';
import { DemoDataService } from '../../core/services/demo-data.service';
@Component({
  selector: 'sai-shelters',
  imports: [DatePipe, PercentPipe],
  template: `<header class="page-heading">
      <div>
        <p class="eyebrow">Mass care</p>
        <h1>Emergency Shelters</h1>
        <p>Capacity, support services, and accessibility across demonstration reception sites.</p>
      </div>
    </header>
    <div class="demo-notice">
      <strong>Synthetic demonstration capacity</strong> — verify every destination before public release.
    </div>
    <div class="metric-grid compact-metrics">
      <article class="metric">
        <strong>{{ openCount() }}</strong
        ><span>Open shelters</span>
      </article>
      <article class="metric">
        <strong>{{ totalSpaces() }}</strong
        ><span>Available spaces</span>
      </article>
      <article class="metric">
        <strong>{{ medicalCount() }}</strong
        ><span>With medical support</span>
      </article>
    </div>
    <div class="entity-cards shelters">
      @for (s of data.shelters(); track s.id) {
        <article>
          <div class="card-top">
            <span class="status">{{ s.status }}</span
            ><span [class.warning]="s.occupancy / s.capacity > 0.8"
              >{{ s.occupancy / s.capacity | percent }} occupied</span
            >
          </div>
          <h2>{{ s.name }}</h2>
          <p>{{ s.address }}</p>
          <div class="occupancy"><i [style.width.%]="(s.occupancy / s.capacity) * 100"></i></div>
          <div class="capacity">
            <div>
              <strong>{{ s.occupancy }}</strong
              ><span>Occupancy</span>
            </div>
            <div>
              <strong>{{ s.capacity - s.occupancy }}</strong
              ><span>Spaces</span>
            </div>
            <div>
              <strong>{{ s.capacity }}</strong
              ><span>Capacity</span>
            </div>
          </div>
          <div class="amenities">
            <span>♿ Accessible</span><span>{{ s.medicalSupport ? '✚ Medical' : '– No medical' }}</span
            ><span>{{ s.pets ? '♞ Pets' : '– No pets' }}</span
            ><span>{{ s.backupPower ? 'ϟ Backup power' : '– No backup' }}</span>
          </div>
          <small>Updated {{ s.lastUpdated | date: 'shortTime' }} · Demo shelter desk</small>
        </article>
      }
    </div>`,
})
export class SheltersComponent {
  constructor(readonly data: DemoDataService) {}
  openCount() {
    return this.data.shelters().filter((s) => s.status === 'Open').length;
  }
  medicalCount() {
    return this.data.shelters().filter((s) => s.medicalSupport).length;
  }
  totalSpaces() {
    return this.data.shelters().reduce((n, s) => n + s.capacity - s.occupancy, 0);
  }
}
