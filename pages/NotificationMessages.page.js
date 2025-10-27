import { expect } from '@playwright/test';

export class NotificationMessagesPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/notification_message_rendered';
        this.notificationTrigger = this.page.locator("//a[@href='/notification_message']");
        this.notification = this.page.locator('#flash');
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async clickNotificationTrigger()
    {
        await this.notificationTrigger.click();
    }
}