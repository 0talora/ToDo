import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { AdminTareasServiceService, Tarea, TaskNotice } from '../admin-tareas-service.service';
import { ApperPipe } from '../apper.pipe';
import { TaskLanguageService } from '../task-language.service';

@Component({
  selector: 'app-tareas-component',
  imports: [FormsModule, ApperPipe],
  templateUrl: './tareas-component.component.html',
  styleUrl: './tareas-component.component.css'
})
export class TareasComponentComponent {
  readonly adminTareas = inject(AdminTareasServiceService);
  readonly i18n = inject(TaskLanguageService);
  notice: TaskNotice | null = null;

  constructor() {
    this.adminTareas.notificacion.pipe(takeUntilDestroyed()).subscribe(notice => {
      this.notice = notice;
    });
  }

  addTarea(input: HTMLInputElement): void {
    if (this.adminTareas.addTarea(input.value)) input.value = '';
    input.focus();
  }

  borrarTarea(tarea: Tarea, input: HTMLInputElement): void {
    this.adminTareas.borrarTarea(tarea);
    input.focus();
  }

  borrarTodasTareas(input: HTMLInputElement): void {
    this.adminTareas.borrarTodasTareas();
    input.focus();
  }
}
