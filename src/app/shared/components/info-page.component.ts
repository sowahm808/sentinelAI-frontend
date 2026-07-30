import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'sai-info-page',
  imports: [RouterLink],
  template: `<main class="info-page">
    <div class="shield">S</div>
    <h1>Access limited</h1>
    <p>
      This area is not available to the demonstration Incident Commander. Frontend controls supplement—but never
      replace—backend authorization.
    </p>
    <a routerLink="/dashboard">Return to overview</a>
  </main>`,
})
export class InfoPageComponent {}
