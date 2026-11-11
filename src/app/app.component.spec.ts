import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('detects a supported language and updates the heading and tab when it changes', async () => {
    const storageKey = 'todo-language';
    const saved = localStorage.getItem(storageKey);
    localStorage.removeItem(storageKey);
    spyOnProperty(navigator, 'languages', 'get').and.returnValue(['it-IT', 'fr-FR']);

    try {
      await TestBed.configureTestingModule({
        imports: [AppComponent],
        providers: [provideRouter([])]
      }).compileComponents();

      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      await fixture.whenStable();
      const page: HTMLElement = fixture.nativeElement;
      expect(page.querySelector('h1')?.textContent).toBe('Gestionnaire de tâches');

      const select = page.querySelector('#language')!;
      select.value = 'de';
      select.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      expect(page.querySelector('h1')?.textContent).toBe('Aufgabenverwaltung');
      expect(document.documentElement.lang).toBe('de');
      expect(document.title).toContain('Aufgabenverwaltung');
      expect(localStorage.getItem(storageKey)).toBe('de');
    } finally {
      if (saved === null) localStorage.removeItem(storageKey);
      else localStorage.setItem(storageKey, saved);
    }
  });
});
