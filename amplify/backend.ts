import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { dataAccess } from './functions/resource';
import dotenv from 'dotenv';
import { Effect, Policy, PolicyStatement, Role } from 'aws-cdk-lib/aws-iam';
import { storage } from './storage/resource';


dotenv.config();

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */


export const backend = defineBackend({
  auth,
  data,
  dataAccess,
  storage
});

const models = backend.data.resources.tables['TodoModel'].tableName;

backend.dataAccess.addEnvironment('TODO_TABLE_NAME', models);

backend.dataAccess.resources.lambda.addToRolePolicy(new PolicyStatement({
  effect: Effect.ALLOW,
  actions: [
    'dynamodb:GetItem',
    'dynamodb:PutItem',
    'dynamodb:DeleteItem',
    'dynamodb:UpdateItem',
    'dynamodb:Query',
    'dynamodb:Scan',
  ],
  resources: [backend.data.resources.tables['TodoModel'].tableArn]
}));

const existingRole = Role.fromRoleArn(backend.stack, 'ExistingRole', 'arn:aws:iam::337909745227:role/amplify-testamplify-arcsi-amplifyAuthunauthenticate-FBHCP5Ktczh2');

const inlinePolicy = new Policy(backend.stack, 'InlinePolicy', {
  statements: [
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        's3:GetObject',
        's3:PutObject',
        's3:DeleteObject',
        's3:ListBucket',
      ],
      resources: [
        'arn:aws:s3:::amplify-testamplify-arcsinfote-firstbucketb40a1e24-0yrkex7vkge0',
        'arn:aws:s3:::amplify-testamplify-arcsinfote-firstbucketb40a1e24-0yrkex7vkge0/*'
      ]
    })
  ]
});

existingRole.attachInlinePolicy(inlinePolicy);