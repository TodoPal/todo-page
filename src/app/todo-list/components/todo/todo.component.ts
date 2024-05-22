import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { distinct, tap } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { loadTodoById } from 'src/app/state/todo/todo.actions';
import { selectTodoById } from 'src/app/state/todo/todo.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-todo',
  template: `
    <div class="flex items-center flex-col p-4">
      <todo-card class="w-[500px]" [todo]="todo" editDisabled/>
    </div>
  `
})
export class TodoComponent {
  todo: Todo | undefined;

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {
    // get todoId from url
    this.store.dispatch(loadTodoById({ todoId: this.route.snapshot.url[1].path }));

    this.store.select<Todo | undefined>(selectTodoById).pipe(
      takeUntilDestroyed(),
      distinct(),
      tap(todo => { this.todo = todo; })
    ).subscribe();
  }
}
