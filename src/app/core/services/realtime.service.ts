import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
export type ConnectionState = 'connected' | 'reconnecting' | 'polling' | 'offline';
export interface RealtimeEvent<T = unknown> {
  id: string;
  type: string;
  organizationId: string;
  incidentId?: string;
  occurredAt: string;
  payload: T;
}
@Injectable({ providedIn: 'root' })
export class RealtimeService {
  readonly connection = signal<ConnectionState>(navigator.onLine ? 'connected' : 'offline');
  private readonly eventSubject = new Subject<RealtimeEvent>();
  readonly events$ = this.eventSubject.asObservable();
  private readonly seen = new Set<string>();
  publishDemo(event: RealtimeEvent): void {
    if (this.seen.has(event.id)) return;
    this.seen.add(event.id);
    this.eventSubject.next(event);
  }
  disconnect(): void {
    this.connection.set('offline');
    this.seen.clear();
  }
}
