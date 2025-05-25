import { RenderMode, ServerRoute } from '@angular/ssr';
import {environment} from '../environments/environment.prod';
import {inject} from '@angular/core';
import {ChallengeService} from './challenge.service';
import {slugify} from './util';


export const serverRoutes: ServerRoute[] = [
  {

    path: 'challenges/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      try {
       const challengeService =inject(ChallengeService);
        const ids: string[] =     await   challengeService.getChallengeTitles().toPromise() || []
        // const ids: string[] = ['building-healthy-relationships']
        return ids.map(id => ({ id }));
      } catch (error) {
        console.error('Error fetching challenge titles for prerender:', error);
        return []; // Fallback to avoid build failure
      }
    }
  },
  {

    path: 'explore/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      try {
        const challengeService =inject(ChallengeService);
        const slugs: string[] =    ( await   challengeService.getCategories().toPromise() || []).map(value => slugify(value.name))
        return slugs.map(id => ({ id }));
      } catch (error) {
        console.error('Error fetching explorer titles for prerender:', error);
        return []; // Fallback to avoid build failure
      }
    }
  },


  { path: '**', renderMode: RenderMode.Server }
];

