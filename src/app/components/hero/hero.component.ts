import {Component, Inject, Input, OnInit, PLATFORM_ID, Renderer2} from '@angular/core';
import {isPlatformBrowser, NgIf} from "@angular/common";
import {buildCssProperty, buildStyle, ColorSchema, ColorService} from '../../color.service';
import {RouterLink} from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'app-hero',
    standalone:true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './hero.component.html',
  styleUrls:['/hero.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ]

})
export class HeroComponent implements OnInit{
  @Input() title:string | undefined = '';
  @Input() subtitle:string | undefined  = '';
  @Input() showCta = false;

  @Input() image:undefined |string
  detailCardColorSchema:ColorSchema ={
    accent:'#6366F1',
    background:'#4F46E5',
    primaryText:'#ffffff',
    secondaryText:'#ABABABFF'

  }
  images = [
    'assets/slider1.jpg',
    'assets/slider2.jpg',
    'assets/slider3.jpg'
  ];

    constructor(private renderer:Renderer2,
                @Inject(PLATFORM_ID) private platformId: Object,
                private colorService:ColorService

    ) {
    }


  ngOnInit(): void {


  }
  redirectToStore(): void {
    const userAgent = navigator.userAgent || navigator.vendor;

    if (/android/i.test(userAgent)) {
      // Redirect to Google Play Store
      window.location.href = 'https://play.google.com/store/apps/details?id=com.az.thrival';
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      // Redirect to Apple App Store
      window.location.href = 'https://apps.apple.com/us/app/thrival-challenges/id67410573129';
    } else {
      // Optional: fallback or show both links
      // window.location.href = 'https://yourwebsite.com/download';
    }
  }


  getTheHeroImage():string{
   let isLight= (isPlatformBrowser(this.platformId)&&localStorage.getItem('theme') || 'light') =='light'
  return isLight ? 'assets/app_mock_screen_1.png' :'assets/app_dark_mock_screen_1.png'
    }

  protected readonly buildStyle = buildStyle;
  protected readonly buildCssProperty = buildCssProperty;
}
