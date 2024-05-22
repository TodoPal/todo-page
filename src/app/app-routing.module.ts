import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo-list/components/todo/todo.component';

const routes: Routes = [
  {
    path: 'todos',
    component: TodoListComponent,
  },
  {
    path: 'todos/:id',
    component: TodoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppRoutingModule {}
