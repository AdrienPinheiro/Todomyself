import {Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import {Todo} from "../../models/todo";
import {TodoService} from "../../services/todo.service";
import { FormBuilder, Validators } from '@angular/forms';
import {IdGeneratorService} from "../../services/id-generator.service";
import {Router} from "@angular/router";

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

  showAddTodoForm : boolean = false;

  constructor(
    private todoService : TodoService,
    private idService : IdGeneratorService,
    private formBuilder: FormBuilder,
    private router : Router
  ) {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ''
    })
  }

  ngOnInit(): void {
    this.getAllTodo();
  }

  getAllTodo(){
    this.todoService.getAllTodos().pipe(map((data) => data.sort((a, b) => {
      return a.isActif === b.isActif ? 0 : a.isActif ? -1 : 1;
    })))
      .subscribe(data => this.todos = data);
  }

  createTodo(){
    const id = this.idService.createId()

    this.todo = {
      id: id,
      title: this.todoForm.value.title,
      description: this.todoForm.value.description,
      date: this.getDate(),
      editing: false,
      isActif: true
    }
    this.todoService.createTodo(this.todo).subscribe();
    this.getAllTodo();
  }

  checkValue(todo : Todo){
    todo.isActif = !todo.isActif
    this.todoService.updateTodo(todo).subscribe();
    if(!todo.isActif){
      this.checkDo();
    } else {
      this.getAllTodo();
    }
  }

  viewDetail(todo: Todo){
    this.router.navigate(['/todos/', todo.id], { state: { data: todo }})
  }

  checkDo(){
    this.todos.sort((a, b) => {
      return a.isActif === b.isActif ? 0 : a.isActif ? -1 : 1;
    })
  }

  deleteTodo(todo: Todo){
    const index = this.todos.indexOf(todo);
    this.todoService.deleteTodo(todo).subscribe();
    if(index != -1){
      this.todos.splice(index, 1);
    }
  }

  getDate(): string{
    let date = new Date();
    return date.getFullYear()+'-'+(date.getMonth()+1).toString().padStart(2,'0')+'-'+date.getDate();
  }
}
