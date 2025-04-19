import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {DarkModeToggleComponent} from '../dark-mode-toogle/dark-mode-toggle.component';
import * as bootstrap from 'bootstrap';
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
    this.scrolled = window.scrollY > 20;
  }

  closeNav() {
    // hide the collapse when a link is clicked
    if (this.bsCollapse) {
      this.bsCollapse.hide();
    }
  }

  ngAfterViewInit(): void {
    this.bsCollapse = new Collapse(this.navCollapse.nativeElement, { toggle: false });
    this.navCollapse.nativeElement.addEventListener('shown.bs.collapse', () => this.menuOpen = true);
    this.navCollapse.nativeElement.addEventListener('hidden.bs.collapse', () => this.menuOpen = false);

  }
  toggleMenu() {
    this.bsCollapse.toggle();
  }
}
