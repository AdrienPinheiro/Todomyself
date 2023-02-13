import {Component, OnInit} from '@angular/core';
import {Todo} from "../../models/todo";
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'app-lister-todos',
  templateUrl: './lister-todos.component.html',
  styleUrls: ['./lister-todos.component.css']
})
export class ListerTodosComponent implements OnInit{

  todos : Todo[] = [];

  constructor(private todoService : TodoService) {
  }

  ngOnInit(): void {
    this.todoService.getAllTodos().subscribe(data => this.todos = data)
  }

  checkValue(id : number){
    this.todos.map(todo => {
      if(todo.id == id){
        todo.isActif = !todo.isActif
        this.todoService.updateOneTodo(todo);
      }
    })
  }

  allInfo(id : number){
    
  }
}
