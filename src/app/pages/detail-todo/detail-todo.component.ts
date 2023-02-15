import {Component, OnInit} from '@angular/core';
import {Todo} from "../../models/todo";
import {TodoService} from "../../services/todo.service";
import {IdGeneratorService} from "../../services/id-generator.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-detail-todo',
  templateUrl: './detail-todo.component.html',
  styleUrls: ['./detail-todo.component.css']
})
export class DetailTodoComponent implements OnInit{

  todo : Todo | any;

  todoSelected: any;

  todoForm : any;

  constructor(
    private todoService : TodoService,
    private formBuilder: FormBuilder,
    private route : ActivatedRoute,
    private router : Router

  ) {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      // @ts-ignore
      const todoId = +params.get('id');
      this.todo = history.state.data;
    });
  }

  editTodo(todo : Todo){
    todo.editing = !todo.editing;
  }

  updateTodo(){
    this.todo.title = this.todoForm.value.title || this.todo.title;
    this.todo.description = this.todoForm.value.description || this.todo.description;
    this.todo.editing = false;
    this.todoService.updateTodo(this.todo).subscribe();
  }

  checkValue(todo : Todo){
    todo.isActif = !todo.isActif
    this.todoService.updateTodo(todo).subscribe();
  }

  deleteTodo(todo : Todo){
    this.todoService.deleteTodo(todo).subscribe();
    this.router.navigate(['/todos']);
  }

}
