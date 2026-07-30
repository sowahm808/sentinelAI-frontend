import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DemoDataService } from '../services/demo-data.service';
@Component({
  selector: 'sai-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `<a class="skip-link" href="#main-content">Skip to main content</a>
    <div class="offline" [hidden]="online()" role="status">
      Offline — showing recently available demonstration data. Drafts only may be saved locally.
    </div>
    <header class="topbar">
      <button class="icon mobile-only" (click)="navOpen.set(!navOpen())" aria-label="Toggle navigation">☰</button
      ><a routerLink="/dashboard" class="brand" aria-label="SentinelAI home"
        ><span class="shield small">S</span><span><b>SentinelAI</b><small>AI That Helps Save Lives</small></span></a
      >
      <div class="org">
        <span>Denton County Demo EOC</span><b><span class="status-dot"></span> Operational Level 1</b>
      </div>
      <label class="incident-select"
        >Incident<select aria-label="Global incident selector">
          <option>Lewisville Tornado Response</option>
          <option>Clear Creek Flood Monitoring</option>
        </select></label
      >
      <div class="top-actions">
        <span class="connection" title="Demo event stream connected">● Connected</span
        ><button class="icon" aria-label="Open command palette" title="Command palette">⌘K</button
        ><button class="icon" aria-label="Notifications">🔔<span class="notification">3</span></button
        ><button class="icon" (click)="toggleTheme()" aria-label="Toggle color theme">{{ dark() ? '☀' : '☾' }}</button
        ><button class="avatar" (click)="userMenu.set(!userMenu())" [attr.aria-expanded]="userMenu()">JL</button>
        @if (userMenu()) {
          <div class="user-menu">
            <b>{{ auth.user()?.name }}</b
            ><span>{{ auth.user()?.role }}</span
            ><button (click)="auth.signOut()">Sign out</button>
          </div>
        }
      </div>
    </header>
    <div class="critical-strip" role="status">
      <strong>◆ CRITICAL</strong
      ><span>{{ data.activeIncidents()[0]?.title }} — {{ data.activeIncidents()[0]?.location }}</span
      ><a [routerLink]="['/incidents', data.activeIncidents()[0]?.id, 'command']">Open command workspace →</a>
    </div>
    <div class="shell">
      <aside [class.open]="navOpen()">
        <nav aria-label="Primary navigation">
          @for (item of nav; track item.path) {
            <a [routerLink]="item.path" routerLinkActive="active" (click)="navOpen.set(false)"
              ><span aria-hidden="true">{{ item.icon }}</span
              >{{ item.label }}</a
            >
          }
        </nav>
        <div class="nav-foot">
          <span class="demo-pill">DEMO MODE</span><small>Synthetic North Texas exercise data</small>
        </div>
      </aside>
      <div class="content">
        <div class="breadcrumbs" aria-label="Breadcrumb">Operations / <strong>SentinelAI</strong></div>
        <main id="main-content" tabindex="-1"><router-outlet /></main>
      </div>
    </div>`,
})
export class ShellComponent {
  readonly navOpen = signal(false);
  readonly userMenu = signal(false);
  readonly online = signal(navigator.onLine);
  readonly dark = signal(
    localStorage.getItem('sentinel-theme') === 'dark' ||
      (!localStorage.getItem('sentinel-theme') && matchMedia('(prefers-color-scheme: dark)').matches),
  );
  readonly nav = [
    { label: 'Overview', path: '/dashboard', icon: '▦' },
    { label: 'Incidents', path: '/incidents', icon: '◆' },
    { label: 'Live Map', path: '/map', icon: '⌖' },
    { label: 'Hospitals', path: '/hospitals', icon: '✚' },
    { label: 'Shelters', path: '/shelters', icon: '⌂' },
    { label: 'Resources', path: '/resources', icon: '▤' },
    { label: 'Alerts', path: '/alerts', icon: '◉' },
    { label: 'Reports', path: '/reports', icon: '▧' },
    { label: 'Administration', path: '/administration', icon: '⚙' },
  ];
  constructor(
    readonly auth: AuthService,
    readonly data: DemoDataService,
  ) {
    document.documentElement.dataset['theme'] = this.dark() ? 'dark' : 'light';
  }
  @HostListener('window:online') onOnline() {
    this.online.set(true);
  }
  @HostListener('window:offline') onOffline() {
    this.online.set(false);
  }
  toggleTheme() {
    this.dark.update((x) => !x);
    document.documentElement.dataset['theme'] = this.dark() ? 'dark' : 'light';
    localStorage.setItem('sentinel-theme', this.dark() ? 'dark' : 'light');
  }
}
