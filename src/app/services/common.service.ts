import { Injectable } from '@angular/core';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '../../../amplify/data/resource';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private client = generateClient<Schema>();

  async fetchTodos() {
    const response = await this.client.queries.echo();
    const { data, errors } = response;
    if (errors) {
      console.error('Error fetching todos:', errors);
      return [];
    }
    try {
      if (!data) {
        console.error('Error: No data received');
        return [];
      }
      else{
        const echoData = JSON.parse(data.toString());
        console.log('Parsed Todos:', JSON.parse(echoData.body));
        return JSON.parse(echoData.body);
      }
    } catch (error) {
      console.error('Error parsing todos:', error);
      return [];
    }
  }
}
