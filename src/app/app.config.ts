// import '@angular/compiler';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {provideHttpClient} from '@angular/common/http';
// import player from 'lottie-web';
//
// // Note: This function must return the player
// export function playerFactory() {
//   return player;
// }
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideClientHydration(withEventReplay())
    ,provideHttpClient(),
  ]
};
