import {Component, Inject, PLATFORM_ID, Renderer2} from '@angular/core';
import {DOCUMENT, isPlatformBrowser} from "@angular/common";

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
      private renderer: Renderer2,
      @Inject(PLATFORM_ID) private platformId:any
  ) {
    const theme = (this.isPlatFormBrowser()&&localStorage.getItem('theme')) || 'light';
    this.isDark = theme === 'dark';
    if (this.isDark) this.renderer.addClass(this.doc.body, 'dark-mode');
  }

  toggle() {
    this.isDark = !this.isDark;

      if (this.isDark) {
        this.renderer.addClass(this.doc.body, 'dark-mode');
      } else {
        this.renderer.removeClass(this.doc.body, 'dark-mode');
      }
    this.persistTheme(this.isDark?'dark':"light")

  }
  persistTheme(theme:'dark'|'light'){
    if (this.isPlatFormBrowser())
    localStorage.setItem('theme',theme);

  }
  isPlatFormBrowser(){
    return isPlatformBrowser(this.platformId)
  }
}
