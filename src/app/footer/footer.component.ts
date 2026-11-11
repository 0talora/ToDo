import { Component, inject } from '@angular/core';
import { TaskLanguageService } from '../task-language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  readonly i18n = inject(TaskLanguageService);
}
