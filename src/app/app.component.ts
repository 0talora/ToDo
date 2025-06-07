import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { TareasComponentComponent } from './tareas-component/tareas-component.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,CommonModule,FormsModule,FooterComponent,TareasComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(){}
  title = 'adminTareas';

  scrollArriba(){
    console.log("¡Click detectado!");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}