import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { FooterComponent } from '../../components/footer/footer.component';
import {StatsComponent} from '../../components/stats/stats.component';
import {ChallengeCategoriesComponent} from '../../components/categories/categories.component';

@Component({
    selector: 'app-home',
  imports: [HeroComponent, FooterComponent, StatsComponent, ChallengeCategoriesComponent],
    templateUrl: 'home.component.html',
    standalone:true,
})
export class HomeComponent {}
