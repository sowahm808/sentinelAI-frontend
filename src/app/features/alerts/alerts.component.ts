import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DemoDataService } from '../../core/services/demo-data.service';
@Component({
  selector: 'sai-alerts',
  imports: [RouterLink, DatePipe],
  template: `<header class="page-heading">
      <div>
        <p class="eyebrow">Public information & warnings</p>
        <h1>Alerts</h1>
        <p>Draft, review, approve, and simulate multi-channel emergency communications.</p>
      </div>
      <a class="primary button" routerLink="/alerts/new">＋ Draft alert</a>
    </header>
    <div class="demo-notice">
      <strong>Sending is simulated.</strong> No message leaves this demonstration environment.
    </div>
    <section class="panel">
      <h2>Operational source alerts</h2>
      @for (a of data.alerts(); track a.id) {
        <div class="alert-row">
          <span class="severity-icon">◆</span>
          <div>
            <b>{{ a.title }}</b
            ><small>{{ a.type }} · {{ a.detail }} · {{ a.updatedAt | date: 'shortTime' }}</small>
          </div>
          <span class="status">{{ a.status }}</span>
        </div>
      }
    </section>
    <section class="panel">
      <h2>Public communication drafts</h2>
      @if (data.publicAlerts().length) {
        @for (a of data.publicAlerts(); track a.id) {
          <div class="alert-row">
            <span>◉</span>
            <div>
              <b>{{ a.headline }}</b
              ><small>{{ a.channels.join(', ') }} · {{ a.geographicTarget }}</small>
            </div>
            <span class="status">{{ a.status }}</span>
          </div>
        }
      } @else {
        <div class="empty-state">
          <b>No public alerts drafted in this session</b>
          <p>Start from a verified incident and require human approval before simulation.</p>
          <a routerLink="/alerts/new">Create a draft</a>
        </div>
      }
    </section>`,
})
export class AlertsComponent {
  constructor(readonly data: DemoDataService) {}
}
