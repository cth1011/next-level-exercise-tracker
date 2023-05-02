import { test, expect } from "@playwright/test";

test.describe("Check template functionalities when logged in as guest", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/app");
  });

  test("Can rename a template", async ({ page }) => {
    const template = page.getByTestId("template-0");
    const templateName = template.getByTestId("template-name");

    await template.getByRole("button").click();
    await template.getByText("Rename", { exact: true }).click();
    await template.getByRole("textbox").click();
    await template.getByRole("textbox").fill("Test");
    await template.getByText("OK", { exact: true }).click();

    await expect(templateName).toHaveText("Test");
  });

  test("Can delete a template", async ({ page }) => {
    const templates = page.locator('div[data-testid^="template-"]');
    const template = page.getByTestId("template-0");
    const children = await templates.count()

    await expect(templates).toHaveCount(children);

    await template.getByRole("button").click();
    await template.getByRole("list").getByText("Delete").click();
    await template
      .getByTestId("modal-action-button")
      .getByText("Delete")
      .click();

    await expect(templates).toHaveCount(children - 1);
  });
});
