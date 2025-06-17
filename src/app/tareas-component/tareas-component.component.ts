import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminTareasServiceService } from '../admin-tareas-service.service';
import { ApperPipe } from '../apper.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tareas-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ApperPipe],
  templateUrl: './tareas-component.component.html',
  styleUrls: ['./tareas-component.component.css']
})
export class TareasComponentComponent implements OnInit, OnDestroy {

  mostrarMensaje = false;
  mensajeToast = '';
  toastTipo: 'success' | 'warning' | 'error' = 'success';
  timeoutId: any;

  private subNotificacion?: Subscription;

  constructor(private adminTareasService: AdminTareasServiceService) { }

  ngOnInit() {
    this.subNotificacion = this.adminTareasService.notificacion.subscribe(({ mensaje, tipo }) => {
      this.mostrarMensaje = true;
      this.mensajeToast = mensaje;
      this.toastTipo = tipo;

      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => this.mostrarMensaje = false, 2000);
    });
  }

  ngOnDestroy() {
    this.subNotificacion?.unsubscribe();
  }

  addTarea(nombre: string) {
    this.adminTareasService.addTarea(nombre);
  }

  borrarTarea(tarea: { nombreTarea: string; completada: boolean }) {
    this.adminTareasService.borrarTarea(tarea);
  }

  get tareasOrdenadas() {
    return this.adminTareasService.tareasOrdenadas();
  }

  borrarTodasTareas() {
    this.adminTareasService.borrarTodasTareas();
  }
}
