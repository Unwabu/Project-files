import {test,expect} from '@playwright/test';
import {LoginPage} from '../pages/loginPage';
import {HomePage} from '../pages/homePage';
import { DataProvider } from '../utils/dataProvider';
import {TestConfig} from './test.config';
import path from 'path'; // Cross-platform path

test.describe('@smoke Petstore Login Tests with JSON data', () => {
let login: LoginPage;
let home: HomePage;
let config: TestConfig;

// GitHub Actions için cross-platform path
const jsonPath = path.join('testdata', 'logindata.json');
const jsonTestData = DataProvider.getTestDataFromJson(jsonPath);

test.beforeEach(async ({ page }) => {
 login = new LoginPage(page);
     home = new HomePage(page);
     config = new TestConfig();
         await page.goto(config.baseUrl);
})

test.afterEach(async ({ page }) => {
    await page.close();
  });

  for(const data of jsonTestData) {
    test(` @dataDriven login to the petstore with ${data.testName} `, async ({ page }) => {
      await login.loginToThePetstore(data.username, data.password);
      if (data.expected.toLowerCase() === 'success') {
        const cardTitles = await home.getCardTitleTexts();
        expect(cardTitles.length).toBeGreaterThan(1);
        expect(cardTitles).toContain('Pets');
      } else {
        await expect.soft(login.errorMessage, 'Snackbar should show correct error message')
          .toHaveText('Username or password are wrong');
      }
    });
  }
});