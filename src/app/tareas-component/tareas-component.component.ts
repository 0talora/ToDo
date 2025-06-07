import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AdminTareasServiceService } from '../admin-tareas-service.service';
import { pipe } from 'rxjs';
import { ApperPipe } from '../apper.pipe';

@Component({
  selector: 'app-tareas-component',
  imports: [CommonModule, FormsModule, ApperPipe],
  templateUrl: './tareas-component.component.html',
  styleUrl: './tareas-component.component.css'
})
export class TareasComponentComponent {
  constructor(private adminTareasService: AdminTareasServiceService) { }

  addTarea(nombre: string) {
    this.adminTareasService.addTarea(nombre);
  }
  borrarTarea(tarea: { nombreTarea: string; completada: boolean }) {
    this.adminTareasService.borrarTarea(tarea);
  }
  get tareasOrdenadas() {
    return this.adminTareasService.tareasOrdenadas();
  }
  borrarTodasTareas(){
    this.adminTareasService.borrarTodasTareas();
  }
}