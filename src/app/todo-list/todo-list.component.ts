import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Store } from '@ngrx/store';
import { selectAllAssignedTodos, selectAllTodos } from '../state/todo/todo.selectors';
import { addTodo, loadAssignedTodos, loadTodos } from '../state/todo/todo.actions';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit {
  public allTodos$ = this.store.select<Todo[]>(selectAllTodos);
  public assignedTodos$ = this.store.select<Todo[]>(selectAllAssignedTodos);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
  }

  saveTodo({ title, text }: { title: string; text: string }): void {
    this.store.dispatch(addTodo({
      title,
      text,
      edited: formatDate(Date.now(), 'yyyy.MM.dd HH:mm', 'en-US')
    }));
  }

  loadAssignedTodos(): void {
    this.store.dispatch(loadAssignedTodos());
  }
}
