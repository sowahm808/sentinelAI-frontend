import { Component, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
@Component({
  selector: 'sai-login',
  imports: [ReactiveFormsModule, RouterLink, MatProgressSpinnerModule],
  template: `<main class="auth-page">
    <section class="auth-brand" aria-labelledby="brand-title">
      <!-- <div class="shield">S</div> -->
       <div>
        <!-- add logo below -->
        <img src="public/favicon.png" alt="SentinelAI Logo" class="logo" />
       </div>
      <p class="eyebrow">Emergency operations intelligence</p>
      <h1 id="brand-title">SentinelAI</h1>
      <p class="tagline">AI That Helps Save Lives</p>
      <p>Shared situational awareness and human-led decisions for complex incidents.</p>
      <ul>
        <li>Unified operational picture</li>
        <li>Reviewed AI decision support</li>
        <li>Connected response workflows</li>
      </ul>
    </section>
    <section class="login-card">
      <div>
        <p class="eyebrow">Secure demo access</p>
        <h2>Sign in to command</h2>
        <p class="muted">Use the prefilled Incident Commander demonstration account.</p>
      </div>
      <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
        <label
          >Email address<input
            type="email"
            autocomplete="username"
            formControlName="email"
            [attr.aria-describedby]="form.controls.email.invalid ? 'email-error' : null"
        /></label>
        @if (form.controls.email.touched && form.controls.email.invalid) {
          <p class="field-error" id="email-error">Enter a valid email address.</p>
        }
        <label>Password<input type="password" autocomplete="current-password" formControlName="password" /></label>
        @if (form.controls.password.touched && form.controls.password.invalid) {
          <p class="field-error">Password is required.</p>
        }
        @if (error()) {
          <div class="error-banner" role="alert">
            Credentials were not recognized. Use the demo account shown below.
          </div>
        }
        <button class="primary" type="submit" [disabled]="loading()">
          @if (loading()) {
            <mat-spinner diameter="18" />
          }
          {{ loading() ? 'Signing in…' : 'Sign in securely' }}</button
        ><a routerLink="/forgot-password">Forgot password?</a>
      </form>
      <div class="demo-credentials">
        <strong>Demo credentials</strong><code>commander@sentinelai.demo</code><code>SentinelDemo123!</code>
      </div>
      <p class="fine-print">Demonstration environment. Operational data is synthetic and not official or current.</p>
    </section>
  </main>`,
})
export class LoginComponent {
  readonly loading = signal(false);
  readonly error = signal(false);
  readonly form = new FormGroup({
    email: new FormControl('commander@sentinelai.demo', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('SentinelDemo123!', { nonNullable: true, validators: Validators.required }),
  });
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}
  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set(false);
    const ok = await this.auth.signIn(this.form.getRawValue().email, this.form.getRawValue().password);
    this.loading.set(false);
    if (ok) await this.router.navigate(['/dashboard']);
    else this.error.set(true);
  }
}
