import { formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroXMark, heroPencil, heroUserPlus, heroTrash } from '@ng-icons/heroicons/outline';
import { Store } from '@ngrx/store';
import { Todo } from 'src/app/models/todo.model';
import { editTodo, removeUserFromTodo, deleteTodo, addUserForTodo } from 'src/app/state/todo/todo.actions';

@Component({
  selector: 'todo-card',
  templateUrl: './todo-card.component.html',
  viewProviders: [
    provideIcons({ heroXMark, heroPencil, heroUserPlus, heroTrash })
  ]
})
export class TodoCard {
  @Input({ required: true }) todo: Todo | undefined = undefined;

  private _editDisabled: boolean = false;
  @Input()
  get editDisabled(): boolean { return this._editDisabled; }

  set editDisabled(value: boolean | '') { value === '' ? this._editDisabled = true : this._editDisabled = value; }

  constructor(
    private router: Router, 
    private store: Store
  ) {}

  saveTodo(result: { title: string; text: string; }): void {
    this.store.dispatch(editTodo({
      id: this.todo?.id ?? '',
      title: result.title,
      text: result.text,
      edited: formatDate(Date.now(), 'yyyy.MM.dd HH:mm', 'en-US')
    }));
  }

  removeUser(todoId: string | undefined, username: string): void {
    this.store.dispatch(removeUserFromTodo({
      todoId: todoId ?? '',
      username
    }));
  }

  deleteTodo(id: string | undefined): void {
    this.store.dispatch(deleteTodo({ id }));
  }

  addUser(username: string): void {
    this.store.dispatch(addUserForTodo({
      todoId: this.todo?.id ?? '',
      username: username,
      time: formatDate(Date.now(), 'yyyy.MM.dd HH:mm', 'en-US')
    }));
  }

  navigateToTodoPage(id: string | undefined): void {
    if (id === undefined) {
      return;
    }

    this.router.navigate([ '/todos/', id ]).catch(err => console.log(err));
  }
}
