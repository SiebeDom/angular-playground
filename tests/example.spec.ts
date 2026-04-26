import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Test');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByTestId('todo-title').click();
  await expect(page.getByTestId('todo-title')).toMatchAriaSnapshot(`- text: Test`);
  await expect(page.getByRole('textbox', { name: 'What needs to be done?' })).toBeEmpty();
  await page.getByText('All Active Completed').click();
  await expect(page.locator('body')).toContainText('All Active Completed');
});
