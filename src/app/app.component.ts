import {Component, inject, PLATFORM_ID} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {isPlatformServer} from '@angular/common';
import { CommonModule } from '@angular/common';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {SocailLinksComponent} from './socail-links/socail-links.component';  // Import common module for basic functionality
declare let gtag: any; // for TypeScript

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone:true,
  imports: [CommonModule, RouterOutlet, FooterComponent, HeaderComponent, SocailLinksComponent],  // Import necessary modules here

})
export class AppComponent {
  title = 'ThrivalWebPage';
  constructor(private router:Router) {
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        gtag('event', 'page_view', {
          page_path: evt.urlAfterRedirects
        });
      }
    });
  }
}
