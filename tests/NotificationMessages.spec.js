import { test, expect } from '@playwright/test';
import { testA11y } from '../fixtures/a11yFixture.js';
import { NotificationMessagesPage } from '../pages/NotificationMessages.page';

test.describe('Notification Messages', () => {
  let notificationMessagesPage;

  const SUCCESS_NOTIF = 'Action successful';
  const FAIL_NOTIF = 'Action unsuccesful, please try again';

  test.beforeEach(async ({ page }) => {
    notificationMessagesPage = new NotificationMessagesPage(page);
    await notificationMessagesPage.goto();
  });

  testA11y('accessibility', async ({ accessibilityBuilder }, testInfo) => { 
    const results = await accessibilityBuilder.analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json"
    });
    
    //expect(results.violations).toEqual([]); 
  });

  test('verifyNotification', async () => {
    await notificationMessagesPage.clickNotificationTrigger();

    const notificationText = (await notificationMessagesPage.notification.innerText())
      .replace('×', '')
      .trim();

    expect([SUCCESS_NOTIF, FAIL_NOTIF]).toContain(notificationText);
  });
});