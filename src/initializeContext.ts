import {
  IntegrationExecutionContext,
  IntegrationInvocationEvent
} from "@jupiterone/jupiter-managed-integration-sdk";

import { GSuiteClient } from "./gsuite";

export default async function initializeContext(
  context: IntegrationExecutionContext<IntegrationInvocationEvent>
) {
  const { config } = context.instance;

  const provider = new GSuiteClient(config.accountId, {
    email: config.email,
    key: config.key,
    subject: config.subject
  });
  await provider.authenticate();

  const { persister, graph } = context.clients.getClients();

  return {
    graph,
    persister,
    provider
  };
}
