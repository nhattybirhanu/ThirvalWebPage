import {Component, Inject, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-dark-mode-toggle',
  imports: [],
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.css'],
  standalone:true
})
export class DarkModeToggleComponent {
  isDark = false;

  constructor(
      @Inject(DOCUMENT) private doc: Document,
      private renderer: Renderer2
  ) {
    const theme = localStorage.getItem('theme') || 'light';
    this.isDark = theme === 'dark';
    if (this.isDark) this.renderer.addClass(this.doc.body, 'dark-mode');
  }

  toggle() {
    this.isDark = !this.isDark;
    if (this.isDark) {
      this.renderer.addClass(this.doc.body, 'dark-mode');
      localStorage.setItem('theme','dark');
    } else {
      this.renderer.removeClass(this.doc.body, 'dark-mode');
      localStorage.setItem('theme','light');
    }
  }
}
