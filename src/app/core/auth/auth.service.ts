import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser, Permission, Session } from './auth.models';
const STORAGE_KEY = 'sentinelai.demo.session';
const DEMO_USER: AuthUser = {
  id: 'usr-ic-01',
  name: 'Jordan Lee',
  email: 'commander@sentinelai.demo',
  organization: 'Denton County Demo EOC',
  role: 'IncidentCommander',
  permissions: [
    'incidents.read',
    'incidents.create',
    'incidents.update',
    'incidents.command',
    'recommendations.generate',
    'recommendations.review',
    'alerts.draft',
    'alerts.send',
    'resources.read',
    'resources.update',
    'reports.generate',
  ],
};
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly sessionState = signal<Session | null>(this.restore());
  readonly user = computed(() => this.sessionState()?.user ?? null);
  readonly authenticated = computed(() => !!this.sessionState() && this.sessionState()!.expiresAt > Date.now());
  constructor(private readonly router: Router) {}
  async signIn(email: string, password: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 450));
    if (email.toLowerCase() !== DEMO_USER.email || password !== 'SentinelDemo123!') return false;
    const session = { user: DEMO_USER, accessToken: 'demo-session-token', expiresAt: Date.now() + 8 * 60 * 60 * 1000 };
    this.sessionState.set(session);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return true;
  }
  hasPermission(permission: Permission): boolean {
    return this.user()?.permissions.includes(permission) ?? false;
  }
  token(): string | null {
    return this.authenticated() ? this.sessionState()!.accessToken : null;
  }
  signOut(): void {
    this.sessionState.set(null);
    sessionStorage.removeItem(STORAGE_KEY);
    void this.router.navigate(['/login']);
  }
  private restore(): Session | null {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as Session;
      return parsed.expiresAt > Date.now() ? parsed : null;
    } catch {
      return null;
    }
  }
}
