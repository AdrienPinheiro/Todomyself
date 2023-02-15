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

  todoSelected: any;

  constructor(private todoService : TodoService) {
  }

  ngOnInit(): void {
    this.todoService.getAllTodos().pipe(map((data) => data.sort((a, b) => {
      return a.isActif === b.isActif ? 0 : a.isActif ? -1 : 1;
    })))
      .subscribe(data => this.todos = data);
  }

  checkValue(todo : Todo){
    todo.isActif = !todo.isActif
    this.todoService.changeActif(todo).subscribe();
  }

  checkDo(todos : Todo[]){
    todos.sort((a, b) => {
      return a.isActif === b.isActif ? 0 : a.isActif ? -1 : 1;
    })
  }

  allInfo(todo : Todo){
    this.todoSelected = todo
  }
}
