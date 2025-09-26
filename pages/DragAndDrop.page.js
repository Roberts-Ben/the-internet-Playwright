import { expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export class DragAndDropPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/drag_and_drop';
        this.dragA = '#column-a';
        this.dragB = '#column-b';
        this.headerA = this.page.locator('#column-a > header');
        this.headerB = this.page.locator('#column-b > header');

        const dragDropPath = path.resolve('./resources/dragDropHelper.js');
        this.dragDropScript = fs.readFileSync(dragDropPath, 'utf8');
    }

    async goto() 
    {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    }

    async dragAndDrop()
    {
        await this.page.dragAndDrop(this.dragA, this.dragB);

        const headerAContent = await this.headerA.textContent();
        const headerBContent = await this.headerB.textContent();

        if(headerAContent !== 'B' || headerBContent !== 'A')
        {
            console.log("Action failed, running dragDropHelper.js");
            await this.dragAndDropScript();
        }
    }
    
    async dragAndDropScript()
    {
        await this.page.evaluate(({ sourceSelector, targetSelector, script }) => {
            eval(script);
            simulateDragDrop(
                document.querySelector(sourceSelector),
                document.querySelector(targetSelector)
            );
        }, {sourceSelector: this.dragA, targetSelector: this.dragB, script: this.dragDropScript});
    }
}