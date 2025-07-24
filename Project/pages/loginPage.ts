 import { Page,Locator } from "@playwright/test";

export class LoginPage {
    // Define locators for the login page elements
    // should stay in class scope to be reusable in other tests but must be readonly
    // This allows us to use these locators in methods without needing to redefine them each time
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginSubmitButton: Locator;
private readonly errorMassage: Locator;

  // Constructor to initialize the locators
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole("textbox", { name: "Username" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.loginSubmitButton = page.locator('#login__submit');
    this.errorMassage = page.locator('#cdk-overlay-1').getByText('Username or password are wrong');

  }
get errorMessage(): Locator {
    return this.page.locator('simple-snack-bar')
  }
  // Method to perform page actions
  //we can specify promise return type to make it clear that this method is asynchronous
  async loginToThePetstore(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginSubmitButton.click();
  }
}