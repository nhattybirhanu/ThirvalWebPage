import { RenderMode, ServerRoute } from '@angular/ssr';
import {environment} from '../environments/environment.prod';


export const serverRoutes: ServerRoute[] = [
  {

    path: 'challenges/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      try {
        const res = await fetch(`${environment.BASE_URL}challenges/slugs`);

        if (!res.ok) {
          console.error('Failed to fetch challenge titles:', res.statusText);
          return []; // Don't crash the build
        }

        const ids: string[] = await res.json();
        // const ids: string[] = ['building-healthy-relationships']
        return ids.map(id => ({ id }));
      } catch (error) {
        console.error('Error fetching challenge titles for prerender:', error);
        return []; // Fallback to avoid build failure
      }
    }
  },


  { path: '**', renderMode: RenderMode.Server }
];

