import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
bootstrapApplication(AppComponent, appConfig).catch((error: unknown) => { document.body.textContent = 'SentinelAI could not start. Refresh or contact support.'; throw error; });
