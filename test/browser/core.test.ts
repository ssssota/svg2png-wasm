import { test, expect } from '@playwright/test';

test.describe('umd', () => {
  test('snapshot', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/test/browser/snapshot.umd.html`);
    await page.waitForFunction('window.processComplete');
    expect(await page.screenshot()).toMatchSnapshot('umd.png');
  });
  test('invalidwasm', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/test/browser/invalidwasm.umd.html`);
    await page.waitForFunction('window.processComplete');
  });
});

test.describe('esm', () => {
  test('snapshot', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/test/browser/snapshot.esm.html`);
    await page.waitForFunction('window.processComplete');
    expect(await page.screenshot()).toMatchSnapshot('esm.png');
  });
  test('invalidwasm', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/test/browser/invalidwasm.esm.html`);
    await page.waitForFunction('window.processComplete');
  });
});
