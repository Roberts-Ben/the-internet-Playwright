import { test as base } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export const testA11y = base.extend({
  accessibilityBuilder: async ({ page }, use) => {
    const builder = new AxeBuilder({ page }).withTags([
      'wcag2a',
      'wcag2aa',
      'wcag21a',
      'wcag21aa'
    ]);
    await use(builder);
  }
});