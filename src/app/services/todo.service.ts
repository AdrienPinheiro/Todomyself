import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {Todo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient
  ) {}

  url = "https://adrienpinheiro.github.io/Data/todos.json";

  getAllTodos(): Observable<Todo[]>{
    return this.http.get<{ todos : Todo[] }>(this.url).pipe(
      map((data) => data.todos.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }))
    );
  }

  /*url = "http://localhost:3000";

  getAllTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.url+'/todos').pipe(
      map((data) => data.todos.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }))
    );
  }*/

  updateTodo(todo : Todo){
    return this.http.patch<Todo>(this.url+'/todos/'+todo.id, todo);
  }

  createTodo(todo : Todo){
    return this.http.post<Todo>(this.url+'/todos', todo);
  }

  deleteTodo(todo: Todo){
    return this.http.delete(this.url+'/todos/'+todo.id);
  }
}
