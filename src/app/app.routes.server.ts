import { RenderMode, ServerRoute } from '@angular/ssr';


export const serverRoutes: ServerRoute[] = [
  {

    path: 'challenge-pack/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      try {
        const res = await fetch('https://challenger-stage-a6c8f9714982.herokuapp.com/api/v1/public/challenges/slugs');

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

