import {
  IntegrationExecutionContext,
  IntegrationExecutionResult,
  IntegrationInvocationEvent
} from "@jupiterone/jupiter-managed-integration-sdk";

import initializeContext from "../src/initializeContext";
import fetchEntitiesAndRelationships from "../src/jupiterone/fetchEntitiesAndRelationships";

export default async function up(
  context: IntegrationExecutionContext<IntegrationInvocationEvent>
): Promise<IntegrationExecutionResult> {
  const { graph, persister, provider, account } = await initializeContext(
    context
  );
  const oldData = await fetchEntitiesAndRelationships(graph);

  return {
    operations: await persister.publishPersisterOperations([
      entities,
      relationships
    ])
  };
}

export async function down(graph) {
  const oldData = await fetchEntitiesAndRelationships(graph);
}
