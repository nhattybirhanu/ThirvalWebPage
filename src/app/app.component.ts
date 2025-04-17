import {Component, inject, PLATFORM_ID} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {isPlatformServer} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone:true
})
export class AppComponent {
  title = 'ThrivalWebPage';
  constructor() {
    const platformId = inject(PLATFORM_ID);
    const isServer = isPlatformServer(platformId);
    console.log('Running on', isServer ? 'Server' : 'Browser');
  }
}
