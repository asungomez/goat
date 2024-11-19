import { expect } from "@playwright/test";
import { test } from "../fixtures";

test("loads the english language when there is no language preference", async ({
  page,
}) => {
  await page.goto("/");
  expect(page).toHaveURL(/\/en/);
});

test("loads the english language when the language preference is not supported", async ({
  page,
  context,
}) => {
  await context.route("**/*", (route, request) => {
    route.continue({
      headers: {
        ...request.headers(),
        "accept-language": "fr-FR",
      },
    });
  });
  await page.goto("/");
  expect(page).toHaveURL(/\/en/);
});

test("loads the spanish language when the language preference is spanish", async ({
  page,
  context,
}) => {
  await context.route("**/*", (route, request) => {
    route.continue({
      headers: {
        ...request.headers(),
        "accept-language": "es-ES",
      },
    });
  });
  await page.goto("/");
  expect(page).toHaveURL(/\/es/);
});

test("loads the english language when the language preference is english", async ({
  page,
  context,
}) => {
  await context.route("**/*", (route, request) => {
    route.continue({
      headers: {
        ...request.headers(),
        "accept-language": "en-US",
      },
    });
  });
  await page.goto("/");
  expect(page).toHaveURL(/\/en/);
});
