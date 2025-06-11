import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TodoService } from '../todo.service';
import { To_do } from '../models/todo.model';

@Component({
  selector: 'app-private',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './private.component.html',
  styleUrl: './private.component.scss',
})
export class PrivateComponent implements OnInit {
  hasToken = false;
  todos: To_do[] = [];
  todoForm: FormGroup;
  editing = false;
  editingId: number | null = null;

  constructor(private fb: FormBuilder, private todoService: TodoService) {
    this.todoForm = this.fb.group({
      todoName: ['', Validators.required],
      description: [''],
      visible: [true],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.hasToken = document.cookie
      .split(';')
      .some((cookie) => cookie.trim().startsWith('token='));
    if (this.hasToken) {
      this.loadTodos();
    }
  }

  loadTodos() {
    this.todoService.getAll().subscribe((data) => (this.todos = data));
  }

  submit() {
    if (this.todoForm.invalid) return;

    const formValue = this.todoForm.value;

    if (this.editing && this.editingId !== null) {
      this.todoService.update(this.editingId, formValue).subscribe(() => {
        this.loadTodos();
        this.cancel();
      });
    } else {
      this.todoService.add(formValue).subscribe(() => {
        this.loadTodos();
        this.todoForm.reset({ visible: true });
      });
    }
  }

  edit(todo: To_do) {
    this.editing = true;
    this.editingId = todo.id!;
    this.todoForm.patchValue({
      todoName: todo.todoName,
      description: todo.description,
      visible: todo.visible,
      dueDate: todo.dueDate?.substring(0, 16),
      priority: todo.priority,
    });
  }

  cancel() {
    this.editing = false;
    this.editingId = null;
    this.todoForm.reset({ visible: true });
  }

  delete(id: number) {
    this.todoService.delete(id).subscribe(() => this.loadTodos());
  }
}
