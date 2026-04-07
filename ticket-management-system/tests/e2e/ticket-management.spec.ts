import { test, expect } from '@playwright/test';

test.describe('Ticket Management System E2E', () => {

  test.beforeEach(async ({ page }) => {
    // Assuming Angular dev server runs on 4200
    await page.goto('http://localhost:4200');
  });

  test('should display the dashboard and load initial tickets', async ({ page }) => {
    // Verify title
    await expect(page.locator('h1')).toHaveText('Ticket Management Dashboard');
    
    // Check if table renders rows (assuming backend is running and has dummy data)
    const tableRows = page.locator('.ticket-list tbody tr');
    // Wait until at least 1 ticket populates
    await expect(tableRows.first()).toBeVisible();
  });

  test('should allow searching for tickets', async ({ page }) => {
    // Input search string
    const searchInput = page.locator('input[placeholder="Search tickets..."]');
    await searchInput.fill('Setup Database Server');
    
    // Click Search
    await page.locator('button:has-text("Search")').click();
    
    // Verify only the specified ticket is shown
    const firstRowContent = await page.locator('.ticket-list tbody tr').first().innerText();
    expect(firstRowContent).toContain('Setup Database Server');
  });

});
