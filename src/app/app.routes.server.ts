import { RenderMode, ServerRoute } from '@angular/ssr';
import {async} from 'rxjs';
import {inject} from '@angular/core';
import {ChallengeService} from './challenge.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'challenge-pack/:id', renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const challengeService = inject(ChallengeService);
      const ids = await challengeService.getIds(); // Assuming this returns ['1', '2', '3']

      return ids.map(id => ({ id })); // Generates paths like: [{ id: '1' }, { id: '2' }, { id: '3' }]
    }
  }
    ,

  { path: '**', renderMode: RenderMode.Server }
];
// export const serverRouteConfig: ServerRoutes[] = [
//   {
//     path: '/product/:id',
//     renderMode: RenderMode.Prerender,
//    ,
//   },
// ]
