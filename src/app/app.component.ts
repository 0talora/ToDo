import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { TareasComponentComponent } from './tareas-component/tareas-component.component';
import { languages, TaskLanguageService } from './task-language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, FooterComponent, TareasComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly i18n = inject(TaskLanguageService);
  readonly languages = languages;
  readonly languageCodes = Object.keys(languages) as (keyof typeof languages)[];

  ngOnInit(): void {
    this.i18n.updateDocument();
  }
}
