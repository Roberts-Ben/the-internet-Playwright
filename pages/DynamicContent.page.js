import { expect } from '@playwright/test';

export class DynamicContentPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/dynamic_content';
        this.avatars = this.page.getByRole('img');
        this.paragraphHolder = this.page.locator('.large-10');
        this.paragraphs = this.paragraphHolder.locator('.large-10.columns');

        this.staticDynamicLink = this.page.getByRole('link', { name: 'click here' });
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async getAvatarSources()
    {
        return await this.avatars.evaluateAll(imgs => imgs.map(img => img.src));
    }

    async getParagraphTexts()
    {
        return await this.paragraphs.allInnerTexts();
    }

    async enableStaticDynamicMode()
    {
        await this.staticDynamicLink.click();
    }

    hasContentChanged(original, current, skipStatic = false) 
    {
        const startIndex = skipStatic ? 2 : 0;
        for (let i = startIndex; i < original.length; i++) 
        {
            if (original[i] !== current[i]) 
            {
                return true;
            }
        }
        return false;
    }
}