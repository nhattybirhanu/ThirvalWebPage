import { renderApplication } from '@angular/platform-server';
import { config } from './app/app.config.server';
import { ApplicationRef } from '@angular/core';
import {AppComponent} from './app/app.component';
import {bootstrapApplication} from '@angular/platform-browser'; // Import ApplicationRef

import { CommonModule } from '@angular/common';
import { provideServerRendering } from '@angular/platform-server';

export function bootstrap(): Promise<ApplicationRef> {
  return bootstrapApplication(AppComponent, {
    providers: [
      ...config.providers,
      provideServerRendering(), // Add server-side rendering support
    ]
  });
}

export default async function handler(request: Request): Promise<Response> {
  // Use renderApplication with the bootstrap function
  const html = await renderApplication(bootstrap, {
    document: '<!doctype html><html lang="en"><head></head><body><app-root></app-root></body></html>',
    url: request.url,
  });

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
