import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import { TodoCard } from './components/todo-card/todo-card.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroPencil, heroTrash, heroUserPlus, heroXMark } from '@ng-icons/heroicons/outline';
import { TodoDialog } from './components/todo-dialog/todo-dialog.component';
import { AddUserForTodoDialog } from './components/add-user-for-todo-dialog/add-user-for-todo-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './components/todo/todo.component';

@NgModule({
  declarations: [TodoListComponent, TodoComponent, TodoCard, TodoDialog, AddUserForTodoDialog],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({ heroXMark, heroPencil, heroUserPlus, heroTrash })
  ]
})
export class TodoModule { }
