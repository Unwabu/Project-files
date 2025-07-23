import {test,expect} from '@playwright/test';
import {LoginPage} from '../pages/loginPage';
import {HomePage} from '../pages/homePage';
import { DataProvider } from '../utils/dataProvider';
import {TestConfig} from './test.config';
import path from 'path/win32';


test.describe('@smoke Petstore Login Tests with CSV data', () => {
let login: LoginPage;
let home: HomePage;
let config: TestConfig;

const csvPath = path.resolve(__dirname, '../testdata/logindata.csv');
const csvData = DataProvider.getTestDataFromCsv(csvPath);

test.beforeEach(async ({ page }) => {
 login = new LoginPage(page);
     home = new HomePage(page);
     config = new TestConfig();
         await page.goto(config.baseUrl);
})

  for(const data of csvData) {
    test(`@dataDriven login to the petstore with ${data.testName} `, async ({ page }) => {
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