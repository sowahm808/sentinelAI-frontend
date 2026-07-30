import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'sai-reports',
  imports: [RouterLink],
  template: `<header class="page-heading">
      <div>
        <p class="eyebrow">Planning & documentation</p>
        <h1>Reports</h1>
        <p>Create reviewable operational products from current demonstration data.</p>
      </div>
    </header>
    <div class="report-cards">
      @for (r of reports; track r.title) {
        <article>
          <span>{{ r.icon }}</span>
          <h2>{{ r.title }}</h2>
          <p>{{ r.description }}</p>
          @if (r.enabled) {
            <a class="secondary button" routerLink="/incidents/inc-tornado-01/reports/situation">Generate report</a>
          } @else {
            <button disabled>Planned after POC</button>
          }
        </article>
      }
    </div>`,
})
export class ReportsComponent {
  readonly reports = [
    {
      title: 'Situation report',
      icon: '▧',
      description: 'Current conditions, actions, capacity, risks, and approvals.',
      enabled: true,
    },
    {
      title: 'Executive briefing',
      icon: '◫',
      description: 'Concise leadership-level operational overview.',
      enabled: true,
    },
    {
      title: 'Incident action summary',
      icon: '☷',
      description: 'Objectives, assignments, and operational period actions.',
      enabled: true,
    },
    {
      title: 'Resource summary',
      icon: '▤',
      description: 'Readiness, allocation, and assignment history.',
      enabled: true,
    },
    { title: 'Shelter capacity', icon: '⌂', description: 'Mass-care capacity and capability overview.', enabled: true },
    {
      title: 'Hospital impact',
      icon: '✚',
      description: 'Synthetic healthcare status and coordination summary.',
      enabled: true,
    },
    {
      title: 'After-action review',
      icon: '↺',
      description: 'Structured improvement planning after incident closure.',
      enabled: false,
    },
  ];
}
