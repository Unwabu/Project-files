
import { test, expect } from '../utils/fixtures';

test.describe('@smoke Petstore HomePage Tests', () => {
  test('navigate to store', async ({ login, home, config }) => {

    await home.navigateToStore();
    await expect(home.getDashboard()).toContainText('Active Orders');

  });
});
