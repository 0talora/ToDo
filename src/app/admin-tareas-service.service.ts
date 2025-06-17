import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminTareasServiceService {

  tareas: { nombreTarea: string; completada: boolean }[] = [];

  notificacion = new EventEmitter<{ mensaje: string, tipo: 'success'| 'error' }>();

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

  addTarea(nombre: string) {
    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      this.notificacion.emit({ mensaje: 'Debes asignarle un nombre a tu tarea', tipo: 'error' });
      return;
    }

    const tareaExiste = this.tareas.some(t => t.nombreTarea.toLowerCase() === nombreLimpio.toLowerCase());
    if (tareaExiste) {
      this.notificacion.emit({ mensaje: 'No puedes introducir dos tareas con el mismo nombre', tipo: 'error' });
      return;
    }

    this.tareas.unshift({ nombreTarea: nombreLimpio, completada: false });
    this.guardarTareas();

  }

  borrarTarea(tarea: { nombreTarea: string; completada: boolean }) {
    this.tareas = this.tareas.filter(t => t !== tarea);
    this.guardarTareas();
    this.notificacion.emit({ mensaje: 'Tarea borrada', tipo: 'success' });
  }

  tareasOrdenadas() {
    return this.tareas.slice().sort((a, b) => Number(a.completada) - Number(b.completada));
  }

  borrarTodasTareas() {
    this.tareas.length = 0;
    this.guardarTareas();
  }
}
