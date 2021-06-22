import { browser, logging, ExpectedConditions } from 'protractor';
import { AppPage } from './app.po';

describe('Lisp REPL App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should be able to navigate to the create page', async () => {
    await page.navigateTo();
    await page.clickCreateLink();

    browser.wait(ExpectedConditions.urlContains('programs/new'), 5000).then(function(result) {
        expect(result).toEqual(true);
    });
  });

  it('should be able to navigate to the edit page', async () => {
    await page.navigateTo();
    await page.clickCreateLink();

    browser.wait(ExpectedConditions.urlContains('programs/new'), 5000).then(function(result) {
        expect(result).toEqual(true);
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
