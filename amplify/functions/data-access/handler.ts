import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { 
  DynamoDBDocumentClient,
  ScanCommand
} from '@aws-sdk/lib-dynamodb';

import dotenv from 'dotenv';
dotenv.config();

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env['TODO_TABLE_NAME'] || '';

export const handler = async (event: any) => {
  if (!tableName) {
    console.error('Error: Table name is not defined.');
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Table name is not defined in environment variables.' }),
    };
  }

  try {
    const command = new ScanCommand({ TableName: tableName });
    const response = await docClient.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify(response.Items),
    };
  } catch (error) {
    console.error('Error scanning table:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error', error }),
    };
  }

};