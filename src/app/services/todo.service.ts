import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Todo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {}

  url = "http://localhost:3000";

  getAllTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.url+'/todos');
  }

  updateOneTodo(todo : Todo){
    return this.http.patch<Todo>(this.url+'/todos/'+todo.id, todo);
  }
}
