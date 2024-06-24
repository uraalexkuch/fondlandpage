import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  private highContrastMode: boolean = false;

  constructor() {}

  toggleHighContrast() {
    this.highContrastMode = !this.highContrastMode;
    document.body.classList.toggle('high-contrast', this.highContrastMode);
  }

  // Додайте інші методи для різних налаштувань доступності
}
