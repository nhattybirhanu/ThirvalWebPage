import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AboutComponent} from './pages/about/about.component';
import {ChallengePackComponent} from './challenge-pack/challenge-pack.component';
import {MetadataResolver, Page} from './MetadataResolver';
import {ChallengeComponent} from './challenge/challenge.component';
import {ExploreChallengePageComponent} from './expolre-challenge-page/explore-challenge-page.component';
import {CategoryChallengeDetailComponent} from './categorey-challenge-detail/category-challenge-detail.component';
import {CategoriesPageComponent} from './pages/categories-page/categories-page.component';
import {PrivacyComponent} from './pages/privacy/privacy.component';
import {TermsComponent} from './pages/terms/terms.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {path:'explore',component:ExploreChallengePageComponent},
  {path:"explore/:slug",component:CategoryChallengeDetailComponent},
  {path:"categories", component:CategoriesPageComponent},
  {path:'challenges/:id',component:ChallengePackComponent,resolve:{
      metadata:MetadataResolver
    },
    data:{
      page:Page.ChallengePack
    },

  },
  {path:'challenge/:id',component:ChallengeComponent},
  { path: 'terms', component: TermsComponent },
  {path:'privacy',component:PrivacyComponent},
  { path: '**', redirectTo: '' }
];
