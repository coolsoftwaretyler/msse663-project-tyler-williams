import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async clickCreateLink(): Promise<unknown> {
    return element(by.css('[data-protractor="create"]')).click();
  }

  async clickEditLink(): Promise<unknown> {
    return element(by.css('[data-protractor="edit"]')).click();
  }
}
