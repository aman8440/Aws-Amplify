import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
import { TodoListComponent } from "./todo/todo-list/todo-list.component";
const outputs =  require('../../amplify_outputs.json');

Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  imports: [AmplifyAuthenticatorModule, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test_amplify';
}
