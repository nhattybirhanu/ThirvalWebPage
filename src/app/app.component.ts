import {Component, inject, PLATFORM_ID} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {isPlatformServer} from '@angular/common';
import { CommonModule } from '@angular/common';  // Import common module for basic functionality

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone:true,
  imports: [CommonModule, RouterOutlet],  // Import necessary modules here

})
export class AppComponent {
  title = 'ThrivalWebPage';
  constructor() {
    // const platformId = inject(PLATFORM_ID);
    // const isServer = isPlatformServer(platformId);
    // console.log('Running on', isServer ? 'Server' : 'Browser');
  }
}
