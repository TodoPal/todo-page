import { Component, ElementRef, Input, ViewChild, output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { getUsers } from 'src/app/state/todo/todo.actions';
import { selectUsersForTodo } from 'src/app/state/todo/todo.selectors';

@Component({
  selector: 'add-user-for-todo-dialog',
  templateUrl: './add-user-for-todo-dialog.component.html',
})
export class AddUserForTodoDialog {
  @ViewChild('addUserDialog') dialog!: ElementRef<HTMLDialogElement>;

  @Input({ required: true }) todoTitle: string | undefined;
  @Input({ required: true }) todoId: string | undefined;

  usernameToAdd = output<string>();

  usernameInputControl = new FormControl();
  usersForTodo$ = this.store.select<string[]>(selectUsersForTodo);
  filteredUsersForTodo$: Observable<string[]> = this.usersForTodo$;

  constructor(private store: Store) {}

  open(): void {
    this.store.dispatch(getUsers({ todoId: this.todoId }));
    this.dialog.nativeElement.showModal();
  }

  save(): void {
    this.usernameToAdd.emit(this.usernameInputControl.value);
  }
}
