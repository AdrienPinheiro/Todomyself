import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {ListerTodosComponent} from "./pages/lister-todos/lister-todos.component";

const routes: Routes = [
  {
    path: '', redirectTo: 'todos', pathMatch: "full"
  },
  {
    path: 'todos', component: ListerTodosComponent
  },
  {
    path: '**', redirectTo: 'todos'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
