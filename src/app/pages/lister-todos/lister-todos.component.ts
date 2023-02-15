import {Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import {Todo} from "../../models/todo";
import {TodoService} from "../../services/todo.service";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lister-todos',
  templateUrl: './lister-todos.component.html',
  styleUrls: ['./lister-todos.component.css']
})
export class ListerTodosComponent implements OnInit{

  todos : Todo[] = [];

  todo : Todo | any;

  todoSelected: any;

  todoForm : any;

  constructor(
    private todoService : TodoService,
    private formBuilder: FormBuilder) {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.todoService.getAllTodos().pipe(map((data) => data.sort((a, b) => {
      return a.isActif === b.isActif ? 0 : a.isActif ? -1 : 1;
    })))
      .subscribe(data => this.todos = data);
  }

  checkValue(todo : Todo){
    todo.isActif = !todo.isActif
    this.todoService.updateTodo(todo).subscribe();
  }

  checkDo(todos : Todo[]){
    todos.sort((a, b) => {
      return a.isActif === b.isActif ? 0 : a.isActif ? -1 : 1;
    })
  }

  allInfo(todo : Todo){
    if(this.todoSelected == todo){
      this.todoSelected == null;
    } else {
      this.todoSelected = todo;
    }
  }

  editTodo(todo : Todo){
    todo.editing = !todo.editing;
  }

  updateTodo(todo: Todo){
    const index = this.todos.indexOf(todo);
    this.todo = this.todos.at(index);

    this.todo.title = this.todoForm.value.title || this.todo.title;
    this.todo.description = this.todoForm.value.description || this.todo.description;
    this.todo.editing = false;
    this.todoService.updateTodo(this.todo).subscribe();
  }

  deleteTodo(todo: Todo){
    const index = this.todos.indexOf(todo);
    this.todoService.deleteTodo(todo).subscribe();
    if(index != -1){
      this.todos.splice(index, 1);
    }
  }
}
