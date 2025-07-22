import { Page,Locator } from "@playwright/test";



export class HomePage {

  private readonly page: Page;
  private readonly loginSubmitButton: Locator;
  private readonly cardTitles: Locator;



  constructor(page: Page) {
    this.page = page;
    this.loginSubmitButton = page.getByTestId('login__submit');
    // Locator can handle multiple elements and provides methods like .first(), .count(), .nth(), etc.
    this.cardTitles = page.locator('mat-card-title');
    
  }

async getCardTitleTexts(): Promise<string[]> {
      
        
        await this.cardTitles.first().waitFor({ state: 'visible' });
        
        try {
            const count = await this.cardTitles.count();
            console.log('Number of elements found inside the method:', count);

            const titles: string[] = [];
            for (let i = 0; i < count; i++) {
                const text = await this.cardTitles.nth(i).textContent();
                if (text) titles.push(text.trim());
                console.log(`Element ${i + 1} text:`, text);
            }
            
            console.log('Final titles array:', titles);
            return titles;
            
        } catch (error) {
            console.error('Error getting card titles:', error);
            return [];
        }
    }
}