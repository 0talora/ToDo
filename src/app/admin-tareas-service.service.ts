import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminTareasServiceService {

  constructor() {}

  tareas: { nombreTarea: string; completada: boolean }[] = [];

  addTarea(nombre: string) {
    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      window.alert("Debes asignarle un nombre a tu tarea");
      return;
    }

    const tareaExiste = this.tareas.some(t => t.nombreTarea.toLowerCase() === nombreLimpio.toLowerCase());
    if (tareaExiste) {
      window.alert("No puedes introducir dos tareas con el mismo nombre");
      return;
    }

    this.tareas.unshift({ nombreTarea: nombreLimpio, completada: false });

  }
  borrarTarea(tarea:{nombreTarea:string,completada:boolean}){
    this.tareas = this.tareas.filter(t => t !== tarea);
  }
  tareasOrdenadas() {
    return this.tareas.slice().sort((a, b) => Number(a.completada) - Number(b.completada));
  }
  borrarTodasTareas(){
    this.tareas.length=0;
  }
}
