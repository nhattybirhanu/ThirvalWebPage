// import '@angular/compiler';
import {APP_ID, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';


import { routes } from './app.routes';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
  withHttpTransferCacheOptions
} from '@angular/platform-browser';
import {provideHttpClient} from '@angular/common/http';
import {provideServerRendering} from '@angular/platform-server';
import {provideRouter} from '@angular/router';
import { provideLottieOptions } from 'ngx-lottie';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay(), withHttpTransferCacheOptions({}))
    ,provideHttpClient(),
    provideLottieOptions({
      player: () => import('lottie-web') // dynamic import
    }),
    // {provide:APP_ID,useValue:'serverApp'}
  ],


};
