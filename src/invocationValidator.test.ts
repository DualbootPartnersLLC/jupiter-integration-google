import { IntegrationInstanceConfigError } from "@jupiterone/jupiter-managed-integration-sdk";
import invocationValidator from "./invocationValidator";

it("should reject", async () => {
  const executionContext = {
    instance: {
      config: {}
    }
  };
  try {
    await invocationValidator(executionContext as any);
  } catch (e) {
    expect(e instanceof IntegrationInstanceConfigError).toBe(true);
  }
});
