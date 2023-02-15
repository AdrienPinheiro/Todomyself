import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {MenuComponent} from "./components/menu/menu.component";
import {FooterComponent} from "./components/footer/footer.component";
import {ListerTodosComponent} from "./pages/lister-todos/lister-todos.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailTodoComponent } from './pages/detail-todo/detail-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ListerTodosComponent,
    FooterComponent,
    DetailTodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
