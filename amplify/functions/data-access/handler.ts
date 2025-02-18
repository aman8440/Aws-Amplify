import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { 
  DynamoDBDocumentClient, 
  PutCommand, 
  UpdateCommand, 
  DeleteCommand,
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


// async function createTodo(data: any): Promise<AmplifyBackendResponse> {
//   const todo = {
//     type: 'TODO',
//     title: data.title,
//     completed: false,
//     createdAt: new Date().toISOString()
//   };

//   const command = new PutCommand({
//     TableName: tableName,
//     Item: todo
//   });

//   await docClient.send(command);

//   return {
//     statusCode: 201,
//     body: JSON.stringify(todo)
//   };
// }

// async function updateTodo(id: string, data: any): Promise<AmplifyBackendResponse> {
//   const command = new UpdateCommand({
//     TableName: tableName,
//     Key: {
//       id,
//       type: 'TODO'
//     },
//     UpdateExpression: "set completed = :completed",
//     ExpressionAttributeValues: {
//       ":completed": data.completed
//     },
//     ReturnValues: "ALL_NEW"
//   });

//   const response = await docClient.send(command);

//   return {
//     statusCode: 200,
//     body: JSON.stringify(response.Attributes)
//   };
// }

// async function deleteTodo(id: string): Promise<AmplifyBackendResponse> {
//   const command = new DeleteCommand({
//     TableName: tableName,
//     Key: {
//       id,
//       type: 'TODO'
//     }
//   });

//   await docClient.send(command);

//   return {
//     statusCode: 204,
//     body: ''
//   };
// }
