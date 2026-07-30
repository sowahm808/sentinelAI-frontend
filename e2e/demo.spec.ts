import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('button', { name: 'Sign in securely' }).click();
  await expect(page).toHaveURL(/dashboard/);
});
test('demo login, dashboard, command workspace and sign out', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Emergency Operations Overview' })).toBeVisible();
  await page
    .getByRole('link', { name: /Open command workspace/ })
    .first()
    .click();
  await expect(page.getByRole('heading', { name: 'Lewisville Tornado Response' })).toBeVisible();
  await page.getByRole('button', { name: 'JL' }).click();
  await page.getByRole('button', { name: 'Sign out' }).click();
  await expect(page).toHaveURL(/login/);
});
test('create incident', async ({ page }) => {
  await page.getByRole('link', { name: /Create incident/ }).click();
  await page.getByLabel('Title *').fill('Test severe weather response');
  await page.getByLabel('Incident type *').selectOption('Severe weather');
  await page.getByLabel('Description *').fill('Validated demonstration workflow incident.');
  await page.getByLabel('Address *').fill('100 Demo Way');
  await page.getByRole('button', { name: 'Create incident' }).click();
  await expect(page).toHaveURL(/command/);
  await expect(page.getByRole('heading', { name: 'Test severe weather response' })).toBeVisible();
});
test('AI plan approval, resource assignment, alert draft and situation report', async ({ page }) => {
  await page.goto('/incidents/inc-tornado-01/recommendations');
  await page
    .getByRole('button', { name: /Approve/ })
    .first()
    .click();
  await expect(page.getByText('Approved').first()).toBeVisible();
  await page.goto('/resources');
  await page.getByRole('button', { name: 'Assign' }).first().click();
  await page.getByRole('button', { name: 'Confirm assignment' }).click();
  await page.goto('/alerts/new');
  await page.getByRole('button', { name: /Request AI draft/ }).click();
  await expect(page.getByLabel('Headline *')).toHaveValue(/TORNADO/);
  await page.getByRole('button', { name: 'Save draft' }).click();
  await expect(page).toHaveURL(/alerts/);
  await page.goto('/incidents/inc-tornado-01/reports/situation');
  await expect(page.getByText('SITREP 003')).toBeVisible();
});
test('dashboard has no serious accessibility violations', async ({ page }) => {
  const results = await new AxeBuilder({ page }).disableRules(['color-contrast']).analyze();
  expect(results.violations.filter((v) => v.impact === 'critical' || v.impact === 'serious')).toEqual([]);
});
