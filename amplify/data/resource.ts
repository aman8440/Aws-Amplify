import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { dataAccess } from '../functions/resource';

const schema = a.schema({
  TodoModel: a.model({
    type: a.string().required(),
    title: a.string().required(),
    completed: a.boolean().required(),
    createdAt: a.string().required(),
    updatedAt: a.string().required()
  })
  .authorization(allow => [
    allow.owner(),
  ]),

  echo: a
  .query()
  .returns(a.json())
  .handler(a.handler.function(dataAccess))
  .authorization(allow => [
    allow.publicApiKey(),
  ]),

});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  }
});