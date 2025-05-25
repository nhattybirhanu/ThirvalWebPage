import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { FooterComponent } from '../../components/footer/footer.component';
import {LottieLoaderComponent} from '../../lottie-loader/lottie-loader.component';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-about',
    standalone:true,
  imports: [HeroComponent, FooterComponent, LottieLoaderComponent, RouterLink],
    templateUrl:'about.component.html'
})
export class AboutComponent {}
