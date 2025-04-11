import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AboutComponent} from './pages/about/about.component';
import {ChallengePackComponent} from './challenge-pack/challenge-pack.component';
import {MetadataResolver, Page} from './MetadataResolver';
import {ChallengeComponent} from './challenge/challenge.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {path:'challenge-pack/:$id',component:ChallengePackComponent,resolve:{
      metadata:MetadataResolver
    },
    data:{
      page:Page.ChallengePack
    },

  },
  {path:'challenge/:$id',component:ChallengeComponent},
  { path: '**', redirectTo: '' }
];
