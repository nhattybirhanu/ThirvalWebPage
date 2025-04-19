import {AfterViewInit, Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {DarkModeToggleComponent} from '../dark-mode-toogle/dark-mode-toggle.component';
import Collapse from 'bootstrap/js/dist/collapse';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, DarkModeToggleComponent, DarkModeToggleComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit{
  scrolled = false;
  menuOpen = false;

  @ViewChild('navCollapse', { static: true }) navCollapse!: ElementRef<HTMLElement>;
  private bsCollapse!: any;
  @HostListener('window:scroll')
  onScroll() {
    if (this.isPlatFormBrowser())
    this.scrolled = window.scrollY > 20;
  }

  constructor(@Inject(PLATFORM_ID) private platformId:any) {
  }

  closeNav() {
    if (this.isPlatFormBrowser()){
      if (this.bsCollapse) {
        this.bsCollapse.hide();
      }
    }
    // hide the collapse when a link is clicked

  }

  ngAfterViewInit(): void {
    if (this.isPlatFormBrowser()){
      import('bootstrap/js/dist/collapse').then(({ default: Collapse })=> {
          this.bsCollapse = new Collapse(this.navCollapse.nativeElement, { toggle: false });
          this.navCollapse.nativeElement.addEventListener('shown.bs.collapse', () => this.menuOpen = true);
          this.navCollapse.nativeElement.addEventListener('hidden.bs.collapse', () => this.menuOpen = false);

        })

    }

  }
  toggleMenu() {
    if (this.isPlatFormBrowser())
    this.bsCollapse.toggle();
  }
  isPlatFormBrowser(){
  return isPlatformBrowser(this.platformId)
  }
}
