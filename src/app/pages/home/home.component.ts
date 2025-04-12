import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
    selector: 'app-home',
    imports: [HeroComponent, FooterComponent],
    templateUrl: 'home.component.html',
    standalone:true,
})
export class HomeComponent {}
