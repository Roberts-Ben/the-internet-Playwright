import { expect } from '@playwright/test';

export class JavascriptOnLoadEventErrorPage 
{
    constructor(page) 
    {
        this.page = page;
        this.url = 'https://the-internet.herokuapp.com/javascript_error';
        this.jsErrorList = [];

        this.page.on('console', msg => {
          this.jsErrorList.push(msg.text());
        });
    }

  async goto() 
  {
    await this.page.goto(this.url, { waitUntil: 'load' });
    await expect(this.page).toHaveURL(this.url);

    await this.page.evaluate(() => {
      try {
        loadError();
      } catch (e) {
        console.error(e);
      }
    });
  }

  async hasJsErrors() 
  {
    const errorPatterns = [
      'SyntaxError',
      'EvalError',
      'ReferenceError',
      'RangeError',
      'TypeError',
      'URIError'
    ];

    return this.jsErrorList.filter(err =>
      errorPatterns.some(p => err.includes(p))
    );
  }
}