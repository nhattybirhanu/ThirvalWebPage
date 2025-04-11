import { Component, Input } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-hero',
    standalone:true,
    imports: [
        NgIf
    ],
    template: `
    <section class="hero">
      <div class="container hero-content">
        <h1 style="font-size: 3.5rem; margin-bottom: 20px; font-weight: 800;">
          {{ title }}
        </h1>
        <p *ngIf="subtitle"
           style="font-size: 1.25rem; margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto;">
          {{ subtitle }}
        </p>
        <div *ngIf="showCta" style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
          <a href="#signup" class="btn btn-primary">Get Started – It's Free!</a>
          <a href="#challenges" class="btn btn-secondary">Explore Challenges</a>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() showCta = false;
}