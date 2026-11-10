import { Injectable, EventEmitter } from '@angular/core';

export interface Tarea {
  nombreTarea: string;
  completada: boolean;
}

export type TaskNotice = 'missing' | 'duplicate' | 'added' | 'removed' | 'cleared';

@Injectable({
  providedIn: 'root'
})
export class AdminTareasServiceService {

  tareas: Tarea[] = [];

  notificacion = new EventEmitter<TaskNotice>();

  constructor() {
    this.cargarTareas();
  }

  private cargarTareas() {
    const tareasJSON = localStorage.getItem('tareas');
    if (tareasJSON) {
      this.tareas = JSON.parse(tareasJSON);
    }
  }

  private guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

  addTarea(nombre: string): boolean {
    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      this.notificacion.emit('missing');
      return false;
    }

    const tareaExiste = this.tareas.some(t => t.nombreTarea.toLowerCase() === nombreLimpio.toLowerCase());
    if (tareaExiste) {
      this.notificacion.emit('duplicate');
      return false;
    }

    this.tareas.unshift({ nombreTarea: nombreLimpio, completada: false });
    this.guardarTareas();
    this.notificacion.emit('added');
    return true;
  }

  cambiarEstado(tarea: Tarea, completada: boolean): void {
    tarea.completada = completada;
    this.guardarTareas();
  }

  borrarTarea(tarea: Tarea) {
    this.tareas = this.tareas.filter(t => t !== tarea);
    this.guardarTareas();
    this.notificacion.emit('removed');
  }

  tareasOrdenadas() {
    return this.tareas.slice().sort((a, b) => Number(a.completada) - Number(b.completada));
  }

  borrarTodasTareas() {
    this.tareas.length = 0;
    this.guardarTareas();
    this.notificacion.emit('cleared');
  }
}
