import { RenderMode, ServerRoute } from '@angular/ssr';
import {async} from 'rxjs';
import {inject} from '@angular/core';
import {ChallengeService} from './challenge.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'challenge-pack/:id', renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const res = await fetch('https://challenger-stage-a6c8f9714982.herokuapp.com/api/v1/public/challenges/title');
      const ids: string[] = await res.json();
      return ids.map(id => ({ id }));// Generates paths like: [{ id: '1' }, { id: '2' }, { id: '3' }]
    }
  }
    ,

  { path: '**', renderMode: RenderMode.Server }
];
