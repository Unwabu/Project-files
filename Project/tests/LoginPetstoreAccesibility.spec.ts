import { test,expect}  from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';



test('accessibility test for login page', async ({ page }, testInfo) => {

await page.goto('https://training.testifi.io/');
 //scan the entire page for accessibility issues
const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

//assert no accessibility violations
expect.soft(accessibilityScanResults.violations.length).toBe(0);
await testInfo.attach('accessibility-scan-results', {
  body: JSON.stringify(accessibilityScanResults, null, 2),contentType: 'application/json'
});



for (const violation of accessibilityScanResults.violations) {
  console.log(`🚨 Violation: ${violation.id}`);
    console.log('--------------------------------------------------');
  console.log(`👉 Description: ${violation.description}`);
    console.log('--------------------------------------------------');
  console.log(`💡 Help: ${violation.help}`);
    console.log('--------------------------------------------------');
  console.log(`📘 More info: ${violation.helpUrl}`);
    console.log('--------------------------------------------------');
  console.log(`🔥 Impact: ${violation.impact}`);

  for (const node of violation.nodes) {
    console.log(`  ⚠️ Affected Element: ${node.target}`);
      console.log('--------------------------------------------------');
    console.log(`  🧱 HTML Snippet: ${node.html}`);
      console.log('--------------------------------------------------');
    console.log(`  ❗ Failure Summary: ${node.failureSummary}`);
  }

  console.log('--------------------new section-----------------------');
}




/*
//verify spesific accessibility issues

const accessibilityIssues = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa','wcag21a', 'wcag21aa']).analyze();
console.log(accessibilityIssues);
expect.soft(accessibilityIssues.violations.length).toBe(0);
await testInfo.attach('accessibility-scan-results', {
  body: JSON.stringify(accessibilityIssues, null, 2),contentType: 'application/json'
});
 
*/

});