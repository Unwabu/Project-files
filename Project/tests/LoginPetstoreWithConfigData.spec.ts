import {test,expect} from '@playwright/test';
import {LoginPage} from '../pages/loginPage';
import {HomePage} from '../pages/homePage';
import {TestConfig} from './test.config'; 

test.describe('@smoke Petstore Login Tests', () => {
let login: LoginPage;
let home: HomePage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {
config = new TestConfig();
    await page.goto(config.baseUrl);
 login = new LoginPage(page);
     home = new HomePage(page);
})

test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('valid login to the petstore with demoUser', async ({ page }) => {
   
    await login.loginToThePetstore(config.username, config.password);
    const cardTitles = await home.getCardTitleTexts();
    expect(cardTitles.length).toBeGreaterThan(1);
    expect(cardTitles).toContain('Pets');
  });

  test('invalid login to the petstore with demoUser', async ({ page }) => {
    
    await login.loginToThePetstore(config.username, 'randomPassword');
    await expect.soft(login.errorMessage, 'Snackbar should show correct error message')
      .toHaveText('Username or password are wrong');
  });
});
