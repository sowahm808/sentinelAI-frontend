import { environment } from '../../../environments/environment';
import { AppEnvironment } from '../../../environments/environment.model';
export function validateEnvironment(value: AppEnvironment): Readonly<AppEnvironment> {
  if (!value.apiBaseUrl.startsWith('/') && !value.apiBaseUrl.startsWith('https://'))
    throw new Error('apiBaseUrl must use HTTPS or a same-origin path.');
  if (!value.demoMode && !value.apiBaseUrl) throw new Error('A backend API URL is required outside demo mode.');
  return Object.freeze(value);
}
export const appEnvironment = validateEnvironment(environment);
