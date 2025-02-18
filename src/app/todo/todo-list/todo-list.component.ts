import { Component } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-todo-list',
  imports: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  todos: any[] = [];

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.listTodos();
  }


  listTodos() {
    this.commonService.fetchTodos().then((todos) => {
      if (todos) {
        this.todos = todos as any[];
      }
    }).catch(error => {
      console.error('Error fetching todos', error);
    });
  }
}
