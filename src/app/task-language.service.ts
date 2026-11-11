import searchContent from './search-content.json';
import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export const languages = { es: 'Español', en: 'English', fr: 'Français', de: 'Deutsch' };
type Language = keyof typeof languages;
const storageKey = 'todo-language';

const translations = {
  es: {
    language: 'Idioma', task: 'Nombre de la tarea', add: 'Añadir tarea', list: 'Tus tareas',
    empty: 'Todavía no hay tareas. Añade la primera para empezar.', remove: 'Borrar', clear: 'Borrar todas las tareas',
    missing: 'Escribe un nombre para la tarea.', duplicate: 'Ya hay una tarea con ese nombre.',
    added: 'Tarea añadida.', removed: 'Tarea borrada.', cleared: 'Se borraron todas las tareas.',
    developed: 'Desarrollado con', by: 'por Pablo Otalora'
  },
  en: {
    language: 'Language', task: 'Task name', add: 'Add task', list: 'Your tasks',
    empty: 'You have no tasks yet. Add one to get started.', remove: 'Delete', clear: 'Delete all tasks',
    missing: 'Enter a name for the task.', duplicate: 'A task with that name already exists.',
    added: 'Task added.', removed: 'Task deleted.', cleared: 'All tasks deleted.',
    developed: 'Built with', by: 'by Pablo Otalora'
  },
  fr: {
    language: 'Langue', task: 'Nom de la tâche', add: 'Ajouter une tâche', list: 'Vos tâches',
    empty: 'Vous n’avez encore aucune tâche. Ajoutez-en une pour commencer.', remove: 'Supprimer', clear: 'Supprimer toutes les tâches',
    missing: 'Saisissez un nom pour la tâche.', duplicate: 'Une tâche porte déjà ce nom.',
    added: 'Tâche ajoutée.', removed: 'Tâche supprimée.', cleared: 'Toutes les tâches ont été supprimées.',
    developed: 'Développé avec', by: 'par Pablo Otalora'
  },
  de: {
    language: 'Sprache', task: 'Aufgabenname', add: 'Aufgabe hinzufügen', list: 'Deine Aufgaben',
    empty: 'Du hast noch keine Aufgaben. Füge eine Aufgabe hinzu.', remove: 'Löschen', clear: 'Alle Aufgaben löschen',
    missing: 'Gib einen Namen für die Aufgabe ein.', duplicate: 'Eine Aufgabe mit diesem Namen existiert bereits.',
    added: 'Aufgabe hinzugefügt.', removed: 'Aufgabe gelöscht.', cleared: 'Alle Aufgaben wurden gelöscht.',
    developed: 'Entwickelt mit', by: 'von Pablo Otalora'
  }
};

function isLanguage(value: string): value is Language {
  return Object.hasOwn(languages, value);
}

@Injectable({ providedIn: 'root' })
export class TaskLanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  language = this.detectLanguage();

  get strings() {
    const search = searchContent[this.language];
    return { ...translations[this.language], ...search, title: search.h1, pageTitle: search.title };
  }

  languagePath(language: Language): string {
    return language === 'es' ? '/' : `/${language}/`;
  }

  private detectLanguage(): Language {
    const pageLanguage = this.document.documentElement.dataset['pageLanguage'];
    if (pageLanguage && isLanguage(pageLanguage)) return pageLanguage;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved && isLanguage(saved)) return saved;
    } catch {
      // The browser language is available even when storage is blocked.
    }
    return (navigator.languages.length ? navigator.languages : [navigator.language])
      .map(locale => locale.toLowerCase().split('-')[0])
      .find(isLanguage) ?? 'es';
  }

  updateDocument(): void {
    this.document.documentElement.lang = this.language;
    this.title.setTitle(this.strings.pageTitle);
    this.meta.updateTag({ name: 'description', content: this.strings.description });
    this.meta.updateTag({ property: 'og:title', content: this.strings.pageTitle });
    this.meta.updateTag({ property: 'og:description', content: this.strings.description });
  }

  changeLanguage(language: Language): void {
    if (this.document.documentElement.hasAttribute('data-page-language') && language !== this.language) {
      this.document.location.assign(this.languagePath(language));
      return;
    }
    this.language = language;
    this.updateDocument();
    try {
      localStorage.setItem(storageKey, language);
    } catch {
      // The selected language remains active until reload.
    }
  }
}
