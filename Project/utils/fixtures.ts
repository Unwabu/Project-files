import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { TestConfig } from '../tests/test.config'; 

type MyFixtures = {
  login: LoginPage;
  home: HomePage;
  config: TestConfig;
};

export const test = base.extend<MyFixtures>({
  config: async ({}, use) => {
    const config = new TestConfig();
    await use(config);
  },

  login: async ({ page, config }, use) => {
    await page.goto(config.baseUrl);
    const login = new LoginPage(page);
    await login.loginToThePetstore(config.username, config.password);
    await use(login);
  },

  home: async ({ page }, use) => {
    const home = new HomePage(page);
    await use(home);
  },
});

export { expect };
