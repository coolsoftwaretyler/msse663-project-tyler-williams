import { browser, logging, ExpectedConditions, element, by } from 'protractor';
import { AppPage } from './app.po';

describe('Lisp REPL App', () => {
  let page: AppPage;
  let programId: string;

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

  it('should be able to create a new program', async () => {
    await page.navigateTo();
    await page.clickCreateLink();

    await browser.wait(ExpectedConditions.urlContains('programs/new'), 5000);
    await page.writeShortLispProgram('"abc"');
    await page.clickTextEditorSubmit();
    await browser.wait(ExpectedConditions.urlContains('/programs/'), 5000);
    const currentUrl = await browser.getCurrentUrl();
    const currentUrlDelimited = currentUrl.split('/')
    programId = currentUrlDelimited[currentUrlDelimited.length - 1]
    const result = await page.getConsoleOutputText();
    expect(result).toEqual("abc");
  });

  it('should be able to navigate to the edit page', async () => {
    await page.navigateTo();
    await page.clickEditLink();

    browser.wait(ExpectedConditions.urlContains('programs/search'), 5000).then(function(result) {
        expect(result).toEqual(true);
    });
  });

  it ('should be able to search for a program by ID', async () => {
    await page.navigateTo();
    await page.clickEditLink();
    await browser.wait(ExpectedConditions.urlContains('programs/search'), 5000)
    await page.searchforLispProgram(programId);
    await browser.wait(ExpectedConditions.urlContains('/programs/' + programId), 5000);
    const result = await page.getConsoleOutputText();
    expect(result).toEqual("abc");
  })

  it ('should be able to directly visit a program edit page', async () => {
    await page.navigateToEditor(programId);
    const result = await page.getConsoleOutputText();
    expect(result).toEqual("abc");
  })

  it('should be able to edit a program', async () => {
    await page.navigateToEditor(programId);
    await page.writeShortLispProgram('"def"');
    await page.clickTextEditorSubmit();
    const result = await page.getConsoleOutputText();
    expect(result).toEqual("def");
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
