import { RenderMode, ServerRoute } from '@angular/ssr';


export const serverRoutes: ServerRoute[] = [
  {
    path: 'challenge-pack/:id', renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const res = await fetch('https://challenger-stage-a6c8f9714982.herokuapp.com/api/v1/public/challenges/titles');
      console.log("routes res ",res)
      const ids: string[] = await res.json();
      return ids.map(id => ({ id }));// Generates paths like: [{ id: '1' }, { id: '2' }, { id: '3' }]
    }
  },


  { path: '**', renderMode: RenderMode.Server }
];

