import { Component, ElementRef, ViewChild, output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'todo-dialog',
  templateUrl: './todo-dialog.component.html',
})
export class TodoDialog {
  todo: Todo | undefined;
  todoToSave = output<{ title: string; text: string; }>();

  @ViewChild('todoDialog') dialog!: ElementRef<HTMLDialogElement>;

  todoFormGroup = new FormGroup({
    todoTitle: new FormControl('', [ Validators.required ]),
    todoText: new FormControl('')
  });

  open(): void {
    this.dialog.nativeElement.showModal();
  }

  openForEdit(todo: Todo | undefined): void {
    this.todo = todo;
    this.todoFormGroup.controls.todoTitle.setValue(todo?.title ?? '');
    this.todoFormGroup.controls.todoText.setValue(todo?.text ?? '');
    this.dialog.nativeElement.showModal();
  }

  save(): void {
    if (this.todoFormGroup.valid) {
      this.todoToSave.emit({
        title: this.todoFormGroup.controls.todoTitle.value!!,
        text: this.todoFormGroup.controls.todoText.value ?? ''
      });
    }
  }
}
