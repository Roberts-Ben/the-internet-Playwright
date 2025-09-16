import { test, expect } from '@playwright/test';
import { ABTestingPage } from '../pages/ABTesting.page';

test.describe('AB Testing', () => {
  const HEADER_A = 'A/B Test Variation 1';
  const HEADER_B = 'A/B Test Control';

  test('verifyHeaderText', async ({ page }) => {
    const abPage = new ABTestingPage(page);

    await abPage.goto();
    const headerText = await abPage.getHeaderText();

    expect([HEADER_A, HEADER_B]).toContain(headerText);
  });
});