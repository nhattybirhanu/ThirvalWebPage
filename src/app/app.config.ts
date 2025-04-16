// import '@angular/compiler';
import {APP_ID, ApplicationConfig, importProvidersFrom, PLATFORM_ID, provideZoneChangeDetection} from '@angular/core';


import { routes } from './app.routes';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
  withHttpTransferCacheOptions
} from '@angular/platform-browser';
import {provideHttpClient} from '@angular/common/http';
import {provideRouter} from '@angular/router';
import { provideLottieOptions } from 'ngx-lottie';
import lottie from 'lottie-web';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay(), withHttpTransferCacheOptions({}))
    ,provideHttpClient(),
    provideLottieOptions({
      player: () => import('lottie-web') // dynamic import
    }),
    // {provide:PLATFORM_ID,useValue:'browser'}
  ],


};

