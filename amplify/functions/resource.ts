import { defineFunction } from "@aws-amplify/backend";

export const dataAccess = defineFunction({
  entry: './data-access/handler.ts',
  resourceGroupName: 'data'
});