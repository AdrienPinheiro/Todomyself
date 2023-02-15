import {Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
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
    this.getAllTodo();
  }

  checkValue(id : number){
    this.todos.map(todo => {
      if(todo.id == id){
        todo.isActif = !todo.isActif
        this.todoService.updateOneTodo(todo).subscribe();
        this.getAllTodo();
        console.log(this.todos)
      }
    })
  }

  checkDo(todos : Todo[]){
    todos.sort((a, b) => {
      return a.isActif === b.isActif ? 0 : a.isActif ? -1 : 1;
    })
  }

  allInfo(id : number){
    console.log(id)
  }

  getAllTodo(){
    this.todoService.getAllTodos().pipe(map((data) => data.sort((a, b) => {
      return a.isActif === b.isActif ? 0 : a.isActif ? -1 : 1;
    }))).subscribe(data => this.todos = data);
  }
}
