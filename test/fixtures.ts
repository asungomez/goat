import { test as base } from "@playwright/test";
import { GenericContainer } from "testcontainers";

export const test = base.extend<{}, { forEachWorker: void }>({
  forEachWorker: [
    async ({}, use) => {
      const appContainer = await (
        await GenericContainer.fromDockerfile("../front-end").build()
      )
        .withExposedPorts({ container: 3000, host: 3001 })
        .start();
      await use();
      await appContainer.stop();
    },
    { scope: "worker", auto: true },
  ],
});
