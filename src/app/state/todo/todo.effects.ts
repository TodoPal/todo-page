import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addTodo,
  addTodoSuccess,
  addTodoFailed,
  deleteTodo,
  deleteTodoSuccess,
  deleteTodoFailed,
  getUsers,
  getUsersSuccess,
  getUsersFailed,
  loadTodos,
  loadTodosSuccess,
  loadTodosFailed,
  addUserForTodo,
  addUserForTodoFailed,
  addUserForTodoSuccess,
  removeUserFromTodo,
  removeUserFromTodoFailed,
  removeUserFromTodoSuccess,
  editTodoFailed,
  editTodo,
  editTodoSuccess,
  loadAssignedTodos,
  loadAssignedTodosSuccess,
  loadAssignedTodosFailed, loadTodoById, loadTodoByIdSuccess, loadTodoByIdFailed
} from './todo.actions';
import { catchError, from, map, of, switchMap, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TodoService } from 'src/app/services/todo.service';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private todoService: TodoService,
    private userService: UserService,
  ) {}

  // Run this code when a loadTodos action is dispatched
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() =>
        from(this.userService.getUser()).pipe(
          take(1),
          switchMap(currentUser =>
            this.todoService.getTodos(currentUser).pipe(
              map(todos => loadTodosSuccess({ todos })),
              catchError((errorResponse: HttpErrorResponse) => of(loadTodosFailed({ error: errorResponse.error })))
            )
          )
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTodo),
      switchMap(({ id }) =>
        from(this.userService.getUser()).pipe(
          take(1),
          switchMap(currentUser =>
            this.todoService.deleteTodo(id, currentUser).pipe(
              map(() => deleteTodoSuccess()),
              catchError((errorResponse: HttpErrorResponse) => of(deleteTodoFailed({ error: errorResponse.error })))
            )
          )
        )
      )
    )
  );

  deleteTodoSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTodoSuccess),
      map(() => {
        // todo: use snackbar service when ready
        console.log('Todo deleted successfully.');
      })
    ),
  { dispatch: false }
  );

  loadTodosFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodosFailed),
      map(({ error }) => {
        // todo: use snackbar service when ready
        console.error(error);
      })
    ),
  { dispatch: false }
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo),
      switchMap(({ title, text, edited }) =>
        from(this.userService.getUser()).pipe(
          take(1),
          switchMap(currentUser =>
            this.todoService.addTodo(title, text, edited, currentUser).pipe(
              map((todo) => addTodoSuccess({ id: todo.id })),
              catchError((errorResponse: HttpErrorResponse) => of(addTodoFailed({ error: errorResponse.error })))
            )
          )
        )
      )
    )
  );

  editTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editTodo),
      switchMap(({ id, title, text, edited }) =>
        this.todoService.editTodo(id, title, text, edited).pipe(
          map((todo) => editTodoSuccess({ id: todo.id })),
          catchError((errorResponse: HttpErrorResponse) => of(editTodoFailed({ error: errorResponse.error })))
        )
      )
    )
  );

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      switchMap(({ todoId }) =>
        this.todoService.getUsers(todoId).pipe(
          map((users) => getUsersSuccess({ users })),
          catchError((errorResponse: HttpErrorResponse) => of(getUsersFailed({ error: errorResponse.error })))
        )
      )
    )
  );

  getUsersFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsersFailed),
      map(({ error }) =>
        // todo: use snackbar service when ready
        console.error(error)
      )
    ),
  { dispatch: false }
  );

  addUserForTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUserForTodo),
      switchMap(({ todoId, username, time }) =>
        this.todoService.addUserForTodo(todoId, username, time).pipe(
          map((updatedTodo) => addUserForTodoSuccess({ updatedTodo })),
          catchError((errorResponse: HttpErrorResponse) => of(addUserForTodoFailed({ error: errorResponse.error })))
        )
      )
    )
  );

  addUserForTodoFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUserForTodoFailed),
      map(({ error }) =>
        // todo: use snackbar service when ready
        console.error(error)
      )
    ),
  { dispatch: false }
  );

  removeUserFromTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeUserFromTodo),
      switchMap(({ todoId, username }) =>
        this.todoService.removeUserFromTodo(todoId, username).pipe(
          map((updatedTodo) => removeUserFromTodoSuccess({ updatedTodo })),
          catchError((errorResponse: HttpErrorResponse) => of(removeUserFromTodoFailed({ error: errorResponse.error })))
        )
      )
    )
  );

  removeUserFromTodoFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeUserFromTodoFailed),
      map(({ error }) =>
        // todo: use snackbar service when ready
        console.error(error)
      )
    ),
  { dispatch: false }
  );

  loadAssignedTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAssignedTodos),
      switchMap(() =>
        from(this.userService.getUser()).pipe(
          take(1),
          switchMap(currentUser =>
            this.todoService.getAssignedTodos(currentUser).pipe(
              map(assignedTodos => loadAssignedTodosSuccess({ assignedTodos })),
              catchError(error => of(loadAssignedTodosFailed({ error })))
            )
          )
        )
      )
    )
  );

  loadTodoById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodoById),
      switchMap(({ todoId }) =>
        this.todoService.loadTodoById(todoId).pipe(
          map(todo => loadTodoByIdSuccess({ todo })),
          catchError((errorResponse: HttpErrorResponse) => of(loadTodoByIdFailed({ error: errorResponse.error })))
        )
      )
    )
  );

  loadTodoByIdFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodoByIdFailed),
      map(({ error }) =>
        // todo: use snackbar service when ready
        console.error(error)
      )
    ),
  { dispatch: false }
  );
}
