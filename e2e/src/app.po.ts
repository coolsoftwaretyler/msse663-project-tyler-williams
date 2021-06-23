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

  async writeShortLispProgram(program: string): Promise<unknown> {
    return element(by.css('[data-protractor="textEditorTextArea"]')).clear()
    .then(() => {
      element(by.css('[data-protractor="textEditorTextArea"]')).sendKeys(program);
    })
  }

  async clickTextEditorSubmit(): Promise<unknown> {
    return element(by.css('[data-protractor="textEditorSubmit"]')).click();
  }

  async getConsoleOutputText(): Promise<unknown> {
    return element(by.css('[data-protractor="consoleOutput"]')).getText();
  }

  async searchforLispProgram(programId: string): Promise<unknown> {
    return element(by.css('[data-protractor="programId"]')).sendKeys(programId)
    .then(function() {
      element(by.css('[data-protractor="searchSubmit"]')).click();
    })
  }

  async navigateToEditor(programId: String): Promise<unknown> {
    return browser.get(browser.baseUrl + '/programs/' + programId);
  }
}
