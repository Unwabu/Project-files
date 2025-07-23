import test, { expect } from '@playwright/test';
import {LoginPage} from '../pages/loginPage';   
import {HomePage} from '../pages/homePage';
import { TestConfig } from './test.config';
import { devices, defineConfig } from '@playwright/test';
test.describe('Petstore Visual tests', () => {
let login: LoginPage;
let home: HomePage;
let config: TestConfig;
test.beforeEach(async ({ page }) => {
 login = new LoginPage(page);
     home = new HomePage(page);
      config = new TestConfig();
          await page.goto(config.baseUrl);
})


test("Visual test for naviagte",async ({ page }) => {
await expect(page).toHaveScreenshot('login-page.png');
});

test("Verify sign in",async ({ page }) => {
await login.loginToThePetstore(config.username, config.password);
await expect(page).toHaveScreenshot('home-page.png');
await expect(page.getByTestId('login-button')).not.toBeVisible
});

});

